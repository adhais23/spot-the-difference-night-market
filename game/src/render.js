// Rendering: draws the two panels from a scene, paints found-difference
// rings on both, flashes a red X on a wrong click, and keeps the HUD honest.
// Panels are SVGs with viewBox "0 0 560 420"; clicks are scaled into it.

export const VIEW_W = 560;
export const VIEW_H = 420;

const NS = 'http://www.w3.org/2000/svg';

function svgEl(tag, attrs) {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

export function paintPanel(svg, scene, side) {
  svg.setAttribute('viewBox', `0 0 ${VIEW_W} ${VIEW_H}`);
  svg.innerHTML = scene.draw(side);
}

export function viewCoords(svg, event) {
  const rect = svg.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * VIEW_W,
    y: ((event.clientY - rect.top) / rect.height) * VIEW_H,
  };
}

// A satisfying ring + tick where a difference was found, on one panel.
export function markFound(svg, diff) {
  const ring = svgEl('circle', {
    cx: diff.x, cy: diff.y, r: diff.r + 6,
    fill: 'none', stroke: '#2ecc71', 'stroke-width': 5,
    'stroke-dasharray': '10 6', class: 'found-ring',
  });
  const tick = svgEl('text', {
    x: diff.x, y: diff.y - diff.r - 10,
    'text-anchor': 'middle', 'font-size': 26, 'font-weight': 'bold',
    fill: '#2ecc71', stroke: '#0e2b16', 'stroke-width': 4,
    'paint-order': 'stroke', class: 'found-tick',
  });
  tick.textContent = '✓';
  svg.appendChild(ring);
  svg.appendChild(tick);
  // A gentle pop so the ring lands with a little life.
  ring.animate(
    [{ transform: 'scale(1.35)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }],
    { duration: 260, easing: 'ease-out', fill: 'forwards' },
  );
}

// A red X that fades away where a click found nothing.
export function markMiss(svg, x, y) {
  const g = svgEl('g', { class: 'miss-mark' });
  const s = 12;
  g.appendChild(svgEl('line', { x1: x - s, y1: y - s, x2: x + s, y2: y + s, stroke: '#e74c3c', 'stroke-width': 5, 'stroke-linecap': 'round' }));
  g.appendChild(svgEl('line', { x1: x + s, y1: y - s, x2: x - s, y2: y + s, stroke: '#e74c3c', 'stroke-width': 5, 'stroke-linecap': 'round' }));
  svg.appendChild(g);
  g.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, fill: 'forwards' });
  setTimeout(() => g.remove(), 750);
}

// A pulsing gold ring that points at one still-hidden difference (a hint).
export function markHint(svg, diff) {
  const ring = svgEl('circle', {
    cx: diff.x, cy: diff.y, r: diff.r + 8,
    fill: 'none', stroke: '#f5c542', 'stroke-width': 5,
    'stroke-dasharray': '6 8', class: 'hint-ring',
  });
  svg.appendChild(ring);
  ring.animate(
    [{ opacity: 0.25 }, { opacity: 1 }, { opacity: 0.25 }],
    { duration: 700, iterations: 4 },
  );
  setTimeout(() => ring.remove(), 2900);
}

export function clearMarks(svg) {
  svg.querySelectorAll('.found-ring, .found-tick, .hint-ring, .miss-mark').forEach((el) => el.remove());
}

// ---------- HUD ----------

export function setHud({ levelName, found, total, seconds, totalSeconds, score, hintsLeft }) {
  const remain = total - found;
  document.getElementById('level-chip').textContent = levelName;
  document.getElementById('found-chip').innerHTML = `Found <b>${found}/${total}</b>`;
  document.getElementById('remain-chip').innerHTML = `<b>${remain}</b> to go`;
  const mm = Math.floor(seconds / 60);
  const ss = String(seconds % 60).padStart(2, '0');
  const timer = document.getElementById('timer-chip');
  timer.innerHTML = `⏱ <b>${mm}:${ss}</b>`;
  timer.classList.toggle('low', seconds <= 10);
  document.getElementById('score-chip').innerHTML = `Score <b>${score}</b>`;
  document.getElementById('hint-btn').textContent = `💡 Hint (${hintsLeft})`;
  document.getElementById('hint-btn').disabled = hintsLeft <= 0;
  const bar = document.getElementById('timer-fill');
  bar.style.width = `${Math.max(0, (seconds / (totalSeconds || 120)) * 100)}%`;
  bar.classList.toggle('low', seconds <= 10);
}

export function setMessage(text, kind = '') {
  const el = document.getElementById('message');
  el.textContent = text;
  el.className = kind;
}

export function announce(text) {
  document.getElementById('status').textContent = text;
}
