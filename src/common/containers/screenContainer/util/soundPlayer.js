// ./util/SoundPlayer.js

// Initialize the AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const noteStartTimeMap = new Map();

export const playSound = (frequency, noteName) => {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;

  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.1;

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  noteStartTimeMap.set(noteName, { oscillator, gainNode, startTime: audioContext.currentTime });
};

export const stopSound = (noteName) => {
  const noteData = noteStartTimeMap.get(noteName);
  if (noteData) {
    const { oscillator, gainNode, startTime } = noteData;
    const holdDuration = audioContext.currentTime - startTime;

    const fadeOutDuration = Math.min(0.5, Math.max(holdDuration, 0.1));
    gainNode.gain.setTargetAtTime(0, audioContext.currentTime, fadeOutDuration);

    oscillator.stop(audioContext.currentTime + fadeOutDuration);
    noteStartTimeMap.delete(noteName);
  }
};

export const resumeAudioContext = () => {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
};
