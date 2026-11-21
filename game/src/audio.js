// Tiny WebAudio sound effects, generated in code — no audio files, no
// network. A short chime for a find, a low buzz for a miss, a rising
// arpeggio for a cleared level, a soft tick for a hint.

let context = null;

function audioContext() {
  if (!context) {
    const Ctor = window.AudioContext ?? window.webkitAudioContext;
    if (!Ctor) return null;
    context = new Ctor();
  }
  if (context.state === 'suspended') void context.resume();
  return context;
}

function tone(freq, at, dur, type = 'sine', gain = 0.12) {
  const ctx = audioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t0 = ctx.currentTime + at;
  amp.gain.setValueAtTime(0.0001, t0);
  amp.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
  amp.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(amp).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

export const SoundFX = {
  unlock() { audioContext(); },
  found() { tone(660, 0, 0.14); tone(880, 0.09, 0.2); tone(1320, 0.18, 0.22); },
  wrong() { tone(140, 0, 0.22, 'sawtooth', 0.08); },
  hint() { tone(520, 0, 0.12, 'triangle'); tone(780, 0.08, 0.16, 'triangle'); },
  levelClear() {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.24));
  },
  gameOver() { tone(392, 0, 0.25, 'triangle'); tone(311, 0.2, 0.3, 'triangle'); tone(233, 0.4, 0.45, 'triangle'); },
  tick() { tone(980, 0, 0.05, 'square', 0.04); },
};
