// Moon Garden — level 3 (hard). A quiet garden pond at dusk, fireflies over
// the water, a frog on a lily pad. Eight differences, and the light is low.

export const garden = {
  id: 'garden',
  name: 'Moon Garden',
  blurb: 'Fireflies drift over the pond while a frog dreams on a lily pad.',
  seconds: 100,

  diffs: [
    { id: 'frog',   label: "the frog's eyes",   x: 280, y: 305, r: 28 },
    { id: 'lily',   label: 'a lily flower',     x: 205, y: 330, r: 22 },
    { id: 'fly',    label: 'a firefly',         x: 125, y: 120, r: 14 },
    { id: 'bird',   label: 'a bird',            x: 425, y: 115, r: 22 },
    { id: 'ripple', label: 'the moon ripple',   x: 300, y: 385, r: 28 },
    { id: 'petals', label: 'a flower',          x: 485, y: 320, r: 22 },
    { id: 'post',   label: 'a fence post',      x: 85,  y: 285, r: 20 },
    { id: 'wing',   label: 'a butterfly',       x: 350, y: 150, r: 20 },
  ],

  draw(side) {
    const right = side === 'right';
    const g = `dusk-${side}`;
    const s = `pond-${side}`;
    // The frog's eyes are open on the left, closed on the right.
    const frogEyes = right
      ? `<path d="M 268 292 q 6 4 12 0" stroke="#1d2b45" stroke-width="3" fill="none"/><path d="M 288 292 q 6 4 12 0" stroke="#1d2b45" stroke-width="3" fill="none"/>`
      : `<circle cx="274" cy="292" r="6" fill="#fff"/><circle cx="274" cy="292" r="3" fill="#1d2b45"/><circle cx="294" cy="292" r="6" fill="#fff"/><circle cx="294" cy="292" r="3" fill="#1d2b45"/>`;
    // A lily flower turns white on the right.
    const lilyColour = right ? '#fff7e8' : '#ff6b9d';
    // One firefly is missing from the right sky.
    const firefly = right ? '' : `<circle cx="125" cy="120" r="5" fill="#f5c542"/><circle cx="125" cy="120" r="10" fill="#f5c542" opacity="0.3"/>`;
    // A bird sits on the branch on the left only.
    const bird = right ? '' : `<ellipse cx="425" cy="112" rx="12" ry="9" fill="#5a7396"/><circle cx="435" cy="105" r="6" fill="#5a7396"/><path d="M 440 104 l 7 2 l -7 3 Z" fill="#f5c542"/><path d="M 418 108 q -8 -6 -14 -2" stroke="#5a7396" stroke-width="3" fill="none"/>`;
    // The moon's reflection is straight bars on the left, wavy on the right.
    const ripple = right
      ? `<path d="M 280 378 q 10 -6 20 0 q 10 6 20 0" stroke="#ffe9a8" stroke-width="4" fill="none"/><path d="M 280 392 q 10 -6 20 0 q 10 6 20 0" stroke="#ffe9a8" stroke-width="4" fill="none" opacity="0.7"/>`
      : `<rect x="282" y="374" width="36" height="5" rx="2" fill="#ffe9a8"/><rect x="286" y="388" width="28" height="5" rx="2" fill="#ffe9a8" opacity="0.7"/>`;
    // A garden flower has 6 petals on the left, 5 on the right.
    const petals = right
      ? `<circle cx="485" cy="306" r="6" fill="#ff9f43"/><circle cx="497" cy="314" r="6" fill="#ff9f43"/><circle cx="493" cy="328" r="6" fill="#ff9f43"/><circle cx="477" cy="328" r="6" fill="#ff9f43"/><circle cx="473" cy="314" r="6" fill="#ff9f43"/>`
      : `<circle cx="485" cy="304" r="6" fill="#ff9f43"/><circle cx="498" cy="312" r="6" fill="#ff9f43"/><circle cx="496" cy="326" r="6" fill="#ff9f43"/><circle cx="485" cy="332" r="6" fill="#ff9f43"/><circle cx="474" cy="326" r="6" fill="#ff9f43"/><circle cx="472" cy="312" r="6" fill="#ff9f43"/>`;
    // A fence post is missing on the right.
    const post = right ? '' : `<rect x="79" y="258" width="12" height="54" rx="3" fill="#7a4d2b"/><path d="M 79 258 l 6 -8 l 6 8 Z" fill="#7a4d2b"/>`;
    // The butterfly is orange on the left, blue on the right.
    const wingColour = right ? '#4a6fa5' : '#ff9f43';

    return `
    <defs>
      <linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2a1e4f"/><stop offset="0.6" stop-color="#3b2a63"/><stop offset="1" stop-color="#1d2b45"/>
      </linearGradient>
      <linearGradient id="${s}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3d5578"/><stop offset="1" stop-color="#1d2b45"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="560" height="420" fill="url(#${g})"/>
    <circle cx="470" cy="60" r="26" fill="#ffe9a8"/>
    <circle cx="460" cy="52" r="5" fill="#f5c542"/><circle cx="480" cy="68" r="4" fill="#f5c542"/>
    <circle cx="60" cy="60" r="2.5" fill="#fff7e8"/><circle cx="180" cy="40" r="2" fill="#fff7e8"/>
    <circle cx="330" cy="50" r="2.5" fill="#fff7e8"/><circle cx="250" cy="90" r="2" fill="#fff7e8"/>
    ${firefly}
    <circle cx="200" cy="150" r="5" fill="#f5c542"/><circle cx="200" cy="150" r="10" fill="#f5c542" opacity="0.3"/>
    <circle cx="480" cy="180" r="5" fill="#f5c542"/><circle cx="480" cy="180" r="10" fill="#f5c542" opacity="0.3"/>
    <circle cx="90" cy="200" r="5" fill="#f5c542"/><circle cx="90" cy="200" r="10" fill="#f5c542" opacity="0.3"/>
    <path d="M 380 40 q 60 26 120 60" stroke="#5a3d24" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M 420 52 q 30 20 44 44" stroke="#5a3d24" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="392" cy="76" rx="26" ry="12" fill="#2ecc71" transform="rotate(-18 392 76)"/>
    <ellipse cx="452" cy="98" rx="24" ry="11" fill="#27ae60" transform="rotate(14 452 98)"/>${bird}
    <rect x="0" y="300" width="560" height="120" fill="url(#${s})"/>
    <ellipse cx="280" cy="300" rx="280" ry="10" fill="#7fb3d5" opacity="0.35"/>
    <ellipse cx="150" cy="330" rx="60" ry="16" fill="#2ecc71"/>
    <ellipse cx="150" cy="330" rx="44" ry="10" fill="#27ae60"/>
    <ellipse cx="400" cy="350" rx="66" ry="16" fill="#2ecc71"/>
    <ellipse cx="400" cy="350" rx="48" ry="10" fill="#27ae60"/>
    <ellipse cx="280" cy="360" rx="52" ry="14" fill="#2ecc71"/>
    <ellipse cx="280" cy="360" rx="36" ry="9" fill="#27ae60"/>
    <circle cx="150" cy="318" r="8" fill="${lilyColour}"/><circle cx="142" cy="312" r="5" fill="${lilyColour}"/><circle cx="158" cy="312" r="5" fill="${lilyColour}"/><circle cx="150" cy="318" r="3" fill="#f5c542"/>
    <circle cx="400" cy="340" r="8" fill="#ff9f43"/><circle cx="392" cy="334" r="5" fill="#ff9f43"/><circle cx="408" cy="334" r="5" fill="#ff9f43"/><circle cx="400" cy="340" r="3" fill="#f5c542"/>
    <ellipse cx="284" cy="312" rx="26" ry="20" fill="#4caf50"/>
    <circle cx="274" cy="288" r="9" fill="#4caf50"/><circle cx="294" cy="288" r="9" fill="#4caf50"/>${frogEyes}
    <path d="M 272 306 q 12 8 24 0" stroke="#1d2b45" stroke-width="3" fill="none"/>
    <path d="M 262 314 q -10 6 -18 2" stroke="#4caf50" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M 306 314 q 10 6 18 2" stroke="#4caf50" stroke-width="6" fill="none" stroke-linecap="round"/>
    ${ripple}
    <path d="M 0 306 L 560 306" stroke="#7fb3d5" stroke-width="2" opacity="0.4"/>
    <path d="M 20 300 L 540 300" stroke="#7fb3d5" stroke-width="1" opacity="0.3"/>
    <rect x="0" y="246" width="560" height="6" fill="#7a4d2b"/>
    <rect x="160" y="252" width="12" height="54" rx="3" fill="#7a4d2b"/><path d="M 160 252 l 6 -8 l 6 8 Z" fill="#7a4d2b"/>
    <rect x="240" y="252" width="12" height="54" rx="3" fill="#7a4d2b"/><path d="M 240 252 l 6 -8 l 6 8 Z" fill="#7a4d2b"/>
    <rect x="320" y="252" width="12" height="54" rx="3" fill="#7a4d2b"/><path d="M 320 252 l 6 -8 l 6 8 Z" fill="#7a4d2b"/>
    <rect x="400" y="252" width="12" height="54" rx="3" fill="#7a4d2b"/><path d="M 400 252 l 6 -8 l 6 8 Z" fill="#7a4d2b"/>
    <rect x="480" y="252" width="12" height="54" rx="3" fill="#7a4d2b"/><path d="M 480 252 l 6 -8 l 6 8 Z" fill="#7a4d2b"/>${post}
    <ellipse cx="350" cy="150" rx="10" ry="14" fill="${wingColour}" transform="rotate(-24 350 150)"/>
    <ellipse cx="362" cy="150" rx="10" ry="14" fill="${wingColour}" transform="rotate(24 362 150)"/>
    <circle cx="356" cy="150" r="4" fill="#2b2118"/>
    <path d="M 354 146 q -4 -8 -8 -8 M 358 146 q 4 -8 8 -8" stroke="#2b2118" stroke-width="2" fill="none"/>
    <g>${petals}<circle cx="485" cy="318" r="6" fill="#f5c542"/></g>
    <circle cx="60" cy="340" r="7" fill="#ff6b9d"/><circle cx="53" cy="335" r="4" fill="#ff6b9d"/><circle cx="67" cy="335" r="4" fill="#ff6b9d"/><circle cx="60" cy="340" r="2.5" fill="#f5c542"/>
    <circle cx="520" cy="380" r="7" fill="#ff6b9d"/><circle cx="513" cy="375" r="4" fill="#ff6b9d"/><circle cx="527" cy="375" r="4" fill="#ff6b9d"/><circle cx="520" cy="380" r="2.5" fill="#f5c542"/>
    `;
  },
};
