// Bootstrap: wires the panels, buttons and keys to the Game, owns the menu /
// level-clear / game-over / victory screens, and honours the ?shot= presets
// the maker uses to take deterministic screenshots of real play states:
//   ?shot=start  — the menu
//   ?shot=play   — level 1 with 3 of 8 found, 5 to go
//   ?shot=play2  — level 2 with 4 of 8 found, 4 to go
//   ?shot=win    — level 1 cleared, level-clear card up

import { Game } from './game.js';
import { LEVELS } from './scenes.js';
import { SoundFX } from './audio.js';

const game = new Game();
const overlay = document.getElementById('overlay');
const card = document.getElementById('overlay-card');

function showOverlay(html) {
  card.innerHTML = html;
  overlay.classList.remove('hidden');
}

function hideOverlay() {
  overlay.classList.add('hidden');
}

function menuHtml() {
  const buttons = LEVELS.map((level, i) => `
    <button data-level="${i}">${i + 1}. ${level.name}<small>${level.diffs.length} differences · ${level.seconds}s</small></button>
  `).join('');
  return `
    <h2>🔍 Spot the Difference</h2>
    <p>Two pictures hang side by side. They look the same — but <b>8 things</b>
    changed between them. Find them all before the clock runs out!</p>
    <p>Click a difference in <b>either</b> picture to ring it on both.
    A wrong click costs 5 seconds. Three levels, three scenes, one sharp eye.</p>
    <div class="levels">${buttons}</div>
    <div class="keys">
      <kbd>Click</kbd> hunt &nbsp; <kbd>H</kbd> hint &nbsp; <kbd>R</kbd> restart level
      &nbsp; <kbd>Esc</kbd> menu &nbsp; <kbd>1</kbd>–<kbd>3</kbd> pick a level
    </div>`;
}

function openMenu() {
  game.preview(game.levelIndex);
  showOverlay(menuHtml());
  card.querySelectorAll('[data-level]').forEach((btn) => {
    btn.addEventListener('click', () => {
      SoundFX.unlock();
      hideOverlay();
      game.startLevel(Number(btn.dataset.level));
    });
  });
}

function levelClearHtml(detail) {
  const next = detail.levelIndex + 1;
  const hasNext = !detail.last && next < LEVELS.length;
  return `
    <h2>🎉 Level clear!</h2>
    <p class="big">All ${LEVELS[detail.levelIndex].diffs.length} differences found!</p>
    <p>Time bonus: +${detail.bonus} points<br>Total score: <b>${detail.score}</b></p>
    ${hasNext
      ? `<p>Next up: <b>${LEVELS[next].name}</b> — sharper eyes needed.</p>
         <button id="next-btn">Next level →</button>`
      : `<p>That was the last level. Take a bow, detective.</p>
         <button id="again-btn">Play again</button>`}
    <p><button class="secondary" id="menu-btn">Back to menu</button></p>`;
}

function timeUpHtml(detail) {
  return `
    <h2>⏰ Time's up!</h2>
    <p class="big">You found ${detail.found} of ${detail.total} differences.</p>
    <p>${detail.total - detail.found} ${detail.total - detail.found === 1 ? 'was' : 'were'} still hiding.
    Give it another go — now you know where some of them live.</p>
    <button id="retry-btn">Try this level again</button>
    <p><button class="secondary" id="menu-btn">Back to menu</button></p>`;
}

function victoryHtml(score) {
  return `
    <h2>🏆 You found them all!</h2>
    <p class="big">Every difference in every scene — ${LEVELS.reduce((n, l) => n + l.diffs.length, 0)} in all.</p>
    <p>Final score: <b>${score}</b><br>Your eyes deserve a medal. (And a rest.)</p>
    <button id="again-btn">Play again</button>
    <p><button class="secondary" id="menu-btn">Back to menu</button></p>`;
}

// --- events ---------------------------------------------------------------

game.leftSvg.addEventListener('click', (e) => game.clickAt(game.leftSvg, e));
game.rightSvg.addEventListener('click', (e) => game.clickAt(game.rightSvg, e));

document.getElementById('hint-btn').addEventListener('click', () => game.useHint());
document.getElementById('restart-btn').addEventListener('click', () => {
  if (game.running) game.startLevel(game.levelIndex);
});
document.getElementById('menu-btn').addEventListener('click', openMenu);

document.addEventListener('keydown', (e) => {
  if (e.key === 'h' || e.key === 'H') game.useHint();
  else if (e.key === 'r' || e.key === 'R') { if (game.running) game.startLevel(game.levelIndex); }
  else if (e.key === 'Escape') openMenu();
  else if (e.key === 'Enter' && !overlay.classList.contains('hidden')) {
    hideOverlay();
    game.startLevel(0);
  } else if (['1', '2', '3'].includes(e.key) && !overlay.classList.contains('hidden')) {
    const i = Number(e.key) - 1;
    if (i < LEVELS.length) { hideOverlay(); game.startLevel(i); }
  }
});

window.addEventListener('spot-level-clear', (e) => {
  const detail = e.detail;
  if (detail.last) {
    showOverlay(victoryHtml(detail.score));
  } else {
    showOverlay(levelClearHtml(detail));
  }
  const nextBtn = document.getElementById('next-btn');
  if (nextBtn) nextBtn.addEventListener('click', () => { hideOverlay(); game.startLevel(detail.levelIndex + 1); });
  const againBtn = document.getElementById('again-btn');
  if (againBtn) againBtn.addEventListener('click', () => { hideOverlay(); game.score = 0; game.totalScore = 0; game.startLevel(0); });
  const menuBtn = document.getElementById('menu-btn');
  if (menuBtn) menuBtn.addEventListener('click', openMenu);
});

window.addEventListener('spot-time-up', (e) => {
  showOverlay(timeUpHtml(e.detail));
  document.getElementById('retry-btn').addEventListener('click', () => {
    hideOverlay();
    game.startLevel(e.detail.levelIndex);
  });
  document.getElementById('menu-btn').addEventListener('click', openMenu);
});

// --- screenshot presets (real play states, driven by the game's own code) --

const shot = new URLSearchParams(location.search).get('shot');
if (shot === 'play') {
  hideOverlay();
  game.startLevel(0);
  game.reveal(['moon', 'lantern', 'sign']);
} else if (shot === 'play2') {
  hideOverlay();
  game.startLevel(1);
  game.reveal(['antenna', 'gear', 'eye', 'steam']);
} else if (shot === 'win') {
  hideOverlay();
  game.startLevel(0);
  game.reveal(game.scene.diffs.map((d) => d.id));
  game.levelClear();
} else {
  openMenu();
}
