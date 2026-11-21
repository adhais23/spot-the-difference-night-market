// Game state: one level at a time, a countdown, a score, three hints.
// Clicking a difference rings it on both panels; a wrong click costs time
// and points; clearing a level banks a time bonus and opens the next.

import { SoundFX } from './audio.js';
import { levelAt, LEVELS } from './scenes.js';
import {
  paintPanel, viewCoords, markFound, markMiss, markHint, clearMarks,
  setHud, setMessage, announce,
} from './render.js';

const WRONG_TIME_COST = 5;
const WRONG_SCORE_COST = 10;
const FIND_SCORE = 100;
const HINT_SCORE_COST = 25;

export class Game {
  constructor() {
    this.leftSvg = document.getElementById('panel-left');
    this.rightSvg = document.getElementById('panel-right');
    this.levelIndex = 0;
    this.scene = levelAt(0);
    this.found = new Set();
    this.score = 0;
    this.seconds = this.scene.seconds;
    this.hintsLeft = 3;
    this.timerId = null;
    this.running = false;
    this.totalScore = 0;
  }

  get total() { return this.scene.diffs.length; }
  get remain() { return this.total - this.found.size; }

  // Paints a level's two panels without starting it (menu backdrop).
  preview(index) {
    this.stopTimer();
    this.running = false;
    this.levelIndex = index;
    this.scene = levelAt(index);
    this.found = new Set();
    this.score = 0;
    this.seconds = this.scene.seconds;
    this.hintsLeft = 3;
    document.getElementById('level-title').textContent =
      `Level ${index + 1} — ${this.scene.name}`;
    document.getElementById('level-caption').textContent = this.scene.blurb;
    paintPanel(this.leftSvg, this.scene, 'left');
    paintPanel(this.rightSvg, this.scene, 'right');
    clearMarks(this.leftSvg);
    clearMarks(this.rightSvg);
    this.refreshHud();
  }

  startLevel(index) {
    this.stopTimer();
    this.levelIndex = index;
    this.scene = levelAt(index);
    this.found = new Set();
    this.seconds = this.scene.seconds;
    this.hintsLeft = 3;
    this.running = true;
    document.getElementById('level-title').textContent =
      `Level ${index + 1} — ${this.scene.name}`;
    document.getElementById('level-caption').textContent = this.scene.blurb;
    paintPanel(this.leftSvg, this.scene, 'left');
    paintPanel(this.rightSvg, this.scene, 'right');
    clearMarks(this.leftSvg);
    clearMarks(this.rightSvg);
    this.refreshHud();
    setMessage(`Find ${this.total} differences — good hunting!`, 'good');
    announce(`${this.scene.name}. ${this.total} differences to find.`);
    this.startTimer();
  }

  startTimer() {
    this.stopTimer();
    this.timerId = setInterval(() => {
      if (!this.running) return;
      this.seconds -= 1;
      if (this.seconds <= 10 && this.seconds > 0) SoundFX.tick();
      if (this.seconds <= 0) {
        this.seconds = 0;
        this.refreshHud();
        this.timeUp();
        return;
      }
      this.refreshHud();
    }, 1000);
  }

  stopTimer() {
    if (this.timerId) { clearInterval(this.timerId); this.timerId = null; }
  }

  refreshHud() {
    setHud({
      levelName: `Level ${this.levelIndex + 1} · ${this.scene.name}`,
      found: this.found.size,
      total: this.total,
      seconds: this.seconds,
      totalSeconds: this.scene.seconds,
      score: this.totalScore + this.score,
      hintsLeft: this.hintsLeft,
    });
  }

  // A click on either panel, in viewBox coordinates.
  clickAt(svg, event) {
    if (!this.running) return;
    SoundFX.unlock();
    const { x, y } = viewCoords(svg, event);
    const diff = this.scene.diffs.find(
      (d) => !this.found.has(d.id) && Math.hypot(d.x - x, d.y - y) <= d.r + 8,
    );
    if (diff) this.find(diff);
    else this.miss(svg, x, y);
  }

  find(diff) {
    this.found.add(diff.id);
    this.score += FIND_SCORE;
    SoundFX.found();
    markFound(this.leftSvg, diff);
    markFound(this.rightSvg, diff);
    this.refreshHud();
    if (this.remain === 0) {
      this.levelClear();
    } else {
      setMessage(`Nice! You found ${diff.label} — ${this.remain} to go.`, 'good');
      announce(`Found ${diff.label}. ${this.remain} remain.`);
    }
  }

  miss(svg, x, y) {
    this.seconds = Math.max(0, this.seconds - WRONG_TIME_COST);
    this.score = Math.max(0, this.score - WRONG_SCORE_COST);
    SoundFX.wrong();
    markMiss(svg, x, y);
    svg.classList.remove('shake');
    void svg.offsetWidth;
    svg.classList.add('shake');
    this.refreshHud();
    if (this.seconds <= 0) { this.timeUp(); return; }
    setMessage(`Not there — minus ${WRONG_TIME_COST}s. Look closer!`, 'bad');
  }

  useHint() {
    if (!this.running || this.hintsLeft <= 0) return;
    const hidden = this.scene.diffs.filter((d) => !this.found.has(d.id));
    if (!hidden.length) return;
    this.hintsLeft -= 1;
    this.score = Math.max(0, this.score - HINT_SCORE_COST);
    const pick = hidden[Math.floor(Math.random() * hidden.length)];
    SoundFX.hint();
    markHint(this.leftSvg, pick);
    markHint(this.rightSvg, pick);
    this.refreshHud();
    setMessage(`Hint: something changed near the ${pick.label}…`, '');
  }

  levelClear() {
    this.running = false;
    this.stopTimer();
    const bonus = this.seconds * 5;
    this.score += bonus;
    this.totalScore += this.score;
    this.score = 0;
    SoundFX.levelClear();
    this.refreshHud();
    const last = this.levelIndex >= LEVELS.length - 1;
    window.dispatchEvent(new CustomEvent('spot-level-clear', {
      detail: { levelIndex: this.levelIndex, last, bonus, score: this.totalScore },
    }));
  }

  timeUp() {
    this.running = false;
    this.stopTimer();
    SoundFX.gameOver();
    window.dispatchEvent(new CustomEvent('spot-time-up', {
      detail: { levelIndex: this.levelIndex, found: this.found.size, total: this.total },
    }));
  }

  // For screenshot presets: reveal some differences without playing.
  reveal(ids) {
    for (const id of ids) {
      const diff = this.scene.diffs.find((d) => d.id === id);
      if (diff && !this.found.has(id)) {
        this.found.add(id);
        this.score += FIND_SCORE;
        markFound(this.leftSvg, diff);
        markFound(this.rightSvg, diff);
      }
    }
    this.refreshHud();
  }
}
