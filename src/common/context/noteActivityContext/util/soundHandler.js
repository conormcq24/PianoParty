let audioContext;
const activeSounds = new Map(); // Track active sounds by note name

// Initialize a single AudioContext for the entire app
const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

// Play sound function with optimized performance
export const playSound = (note, isActive, frequency, mute) => {
  if (mute) return;
  const context = getAudioContext();
  // Check if the note is already active
  if (activeSounds.has(note)) {
    return; // Prevent duplicate sounds for the same note
  }

  /* an oscillator is a simulated sound wave that you can set the shape of */
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  const panner = context.createStereoPanner();

  /* this sets the oscillator shape, from what I saw sawtooth is the best shape for a corded instrument */
  oscillator.type = 'triangle';
  /* this is telling the oscillator to play the passed in notes frequency */
  oscillator.frequency.setValueAtTime(frequency, context.currentTime);
  /* this applies imperfection to the sound, so its not the same note every time a key is pressed */
  oscillator.detune.setValueAtTime(Math.random() * 2 - 1, context.currentTime);

  oscillator.connect(panner);
  panner.connect(gainNode);
  gainNode.connect(context.destination);

  /* prevents sounds from getting to loud as many sounds are played at once */
  const polyphonicVolumeReduction = 1 / Math.sqrt(activeSounds.size || 1);
  /* maximum volume cap 1 = 100% */
  const maxGain = 1;
  /* actual volume that's played */
  gainNode.gain.setValueAtTime(maxGain * polyphonicVolumeReduction, context.currentTime);

  // Set attack and release times
  const attackTime = 0.05;
  const releaseTime = 0.1;
  const sustainTime = 1.2;

  if (isActive) {
    gainNode.gain.setValueAtTime(0, context.currentTime); // Start at 0
    gainNode.gain.linearRampToValueAtTime(maxGain, context.currentTime + attackTime); // Increase to maxGain
  }

  // Release phase
  const endTime = context.currentTime + sustainTime;
  gainNode.gain.linearRampToValueAtTime(0, endTime + releaseTime);

  // Start oscillator and track it
  oscillator.start();
  activeSounds.set(note, { oscillator, gainNode });

  // Stop oscillator and cleanup
  oscillator.stop(endTime + releaseTime);
  oscillator.onended = () => {
    gainNode.disconnect();
    oscillator.disconnect();
    activeSounds.delete(note); // Remove from active sounds
  };
};

// Stop sound function with smooth fade-out
// Stop sound function with smooth fade-out
export const stopSound = (note) => {
  const sound = activeSounds.get(note);
  if (sound) {
    const { oscillator, gainNode } = sound;
    const context = getAudioContext();
    const currentTime = context.currentTime;

    // Apply a short fade-out to avoid clicking
    gainNode.gain.cancelScheduledValues(currentTime); // Cancel any previous schedules
    gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime); // Maintain current gain

    // Exponential fade-out, more natural
    const fadeOutTime = 0.1; // Duration for fade-out
    gainNode.gain.exponentialRampToValueAtTime(0.0001, currentTime + fadeOutTime); // Ramp to 0 smoothly

    // Stop the oscillator *after* the fade-out completes
    oscillator.stop(currentTime + fadeOutTime); // Stop after fade-out

    oscillator.onended = () => {
      gainNode.disconnect();
      oscillator.disconnect();
      activeSounds.delete(note); // Remove from active sounds
    };
  }
};