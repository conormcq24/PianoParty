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

  // Create oscillator, gain node, and panner
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  const panner = context.createStereoPanner();

  oscillator.type = 'triangle'; // Use triangle wave for harmonics
  oscillator.frequency.setValueAtTime(frequency, context.currentTime);
  oscillator.detune.setValueAtTime(Math.random() * 2 - 1, context.currentTime); // Slight detune

  oscillator.connect(panner);
  panner.connect(gainNode);
  gainNode.connect(context.destination);

  // Adjust polyphonic volume based on number of active sounds
  const polyphonicVolumeReduction = 1 / Math.sqrt(activeSounds.size || 1);
  const maxGain = 0.8; // Prevent excessive volume
  gainNode.gain.setValueAtTime(maxGain * polyphonicVolumeReduction, context.currentTime);

  // Set attack and release times
  const attackTime = 0.01; // Smooth fade-in
  const releaseTime = 0.05; // Smooth fade-out
  const sustainTime = 1; // Duration

  if (isActive) {
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(maxGain, context.currentTime + attackTime);
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
export const stopSound = (note) => {
  const sound = activeSounds.get(note);
  if (sound) {
    const { oscillator, gainNode } = sound;
    const context = getAudioContext();
    const currentTime = context.currentTime;

    // Apply a short fade-out to avoid clicking
    gainNode.gain.cancelScheduledValues(currentTime); // Cancel any previous schedules
    gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime); // Maintain current gain
    gainNode.gain.linearRampToValueAtTime(0, currentTime + 0.05); // Fade out over 50ms

    oscillator.stop(currentTime + 0.05); // Stop the oscillator after the fade-out
    oscillator.onended = () => {
      gainNode.disconnect();
      oscillator.disconnect();
      activeSounds.delete(note); // Remove from active sounds
    };
  }
};
