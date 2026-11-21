// Lantern Night Market — level 1 (easy). A fruit stall under paper lanterns,
// a sleepy cat, a hand-painted sign. Eight differences hide in plain sight.
// Every scene module exports the same shape: id, name, blurb, seconds and
// draw(side), which returns the SVG markup for the 'left' or 'right' panel.
// diffs list the hit regions (viewBox 0 0 560 420) the game checks clicks in.

export const market = {
  id: 'market',
  name: 'Lantern Night Market',
  blurb: 'A fruit stall glows under paper lanterns. A cat naps by the jars.',
  seconds: 120,

  diffs: [
    { id: 'moon',    label: 'the moon',          x: 470, y: 55,  r: 34 },
    { id: 'lantern', label: 'a lantern',         x: 150, y: 96,  r: 22 },
    { id: 'tail',    label: "the cat's tail",    x: 448, y: 322, r: 32 },
    { id: 'orange',  label: 'an orange',         x: 216, y: 306, r: 20 },
    { id: 'sign',    label: 'the sign',          x: 280, y: 176, r: 32 },
    { id: 'star',    label: 'a star',            x: 95,  y: 48,  r: 15 },
    { id: 'flower',  label: 'the jar flower',    x: 336, y: 284, r: 24 },
    { id: 'stripe',  label: 'an awning stripe',  x: 256, y: 142, r: 24 },
  ],

  draw(side) {
    const right = side === 'right';
    const g = `sky-${side}`;
    // The moon is a crescent on the left, full on the right.
    const moon = right
      ? `<circle cx="470" cy="55" r="28" fill="#ffe9a8"/><circle cx="458" cy="48" r="6" fill="#f5c542"/><circle cx="480" cy="62" r="4" fill="#f5c542"/>`
      : `<circle cx="470" cy="55" r="28" fill="#ffe9a8"/><circle cx="482" cy="48" r="24" fill="#1d2b45"/>`;
    // One paper lantern changes colour.
    const lanternColour = right ? '#2ec4b6' : '#e8416b';
    // The cat's tail points up on the left, curls down on the right.
    const tail = right
      ? `<path d="M 452 330 q 26 4 22 26 q -3 16 -18 14" stroke="#3a2c22" stroke-width="9" fill="none" stroke-linecap="round"/>`
      : `<path d="M 452 330 q 26 -6 20 -30 q -4 -14 -16 -12" stroke="#3a2c22" stroke-width="9" fill="none" stroke-linecap="round"/>`;
    // An extra orange appears on the right panel's table.
    const extraOrange = right
      ? `<circle cx="216" cy="306" r="13" fill="#ff9f43"/><circle cx="212" cy="301" r="3" fill="#f5c542"/><path d="M 216 293 q 4 -6 10 -4" stroke="#2ecc71" stroke-width="3" fill="none"/>`
      : '';
    // The stall sign reads OPEN on the left, CLOSED on the right.
    const signWord = right ? 'CLOSED' : 'OPEN';
    const signColour = right ? '#e74c3c' : '#2ecc71';
    // One star is missing from the right sky.
    const star = right ? '' : `<circle cx="95" cy="48" r="4" fill="#fff7e8"/><circle cx="95" cy="48" r="8" fill="none" stroke="#fff7e8" stroke-width="1" opacity="0.5"/>`;
    // The jar holds a flower on the left, stands empty on the right.
    const flower = right ? '' : `<path d="M 336 284 L 336 262" stroke="#2ecc71" stroke-width="3"/><circle cx="336" cy="256" r="7" fill="#ff6b9d"/><circle cx="330" cy="252" r="4" fill="#ff9f43"/><circle cx="342" cy="252" r="4" fill="#ff9f43"/>`;
    // One awning stripe changes colour.
    const stripeColour = right ? '#4a6fa5' : '#e8416b';

    return `
    <defs>
      <linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1d2b45"/><stop offset="1" stop-color="#3b2a63"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="560" height="420" fill="url(#${g})"/>
    <circle cx="60" cy="90" r="3" fill="#fff7e8"/><circle cx="180" cy="38" r="2.5" fill="#fff7e8"/>
    <circle cx="330" cy="70" r="3" fill="#fff7e8"/><circle cx="520" cy="120" r="2.5" fill="#fff7e8"/>
    <circle cx="250" cy="30" r="2" fill="#fff7e8"/>${star}
    ${moon}
    <path d="M 0 78 Q 280 110 560 78" stroke="#8a6d3b" stroke-width="2" fill="none"/>
    <line x1="90" y1="84" x2="90" y2="96" stroke="#8a6d3b" stroke-width="2"/>
    <line x1="150" y1="88" x2="150" y2="100" stroke="#8a6d3b" stroke-width="2"/>
    <line x1="280" y1="92" x2="280" y2="104" stroke="#8a6d3b" stroke-width="2"/>
    <line x1="410" y1="88" x2="410" y2="100" stroke="#8a6d3b" stroke-width="2"/>
    <line x1="500" y1="82" x2="500" y2="94" stroke="#8a6d3b" stroke-width="2"/>
    <ellipse cx="90" cy="108" rx="14" ry="17" fill="#ff9f43"/>
    <ellipse cx="150" cy="112" rx="14" ry="17" fill="${lanternColour}"/>
    <ellipse cx="280" cy="116" rx="14" ry="17" fill="#f5c542"/>
    <ellipse cx="410" cy="112" rx="14" ry="17" fill="#ff6b9d"/>
    <ellipse cx="500" cy="106" rx="14" ry="17" fill="#2ec4b6"/>
    <rect x="60" y="150" width="440" height="14" rx="4" fill="#7a4d2b"/>
    <rect x="70" y="164" width="30" height="26" fill="${stripeColour}"/>
    <rect x="100" y="164" width="30" height="26" fill="#fff7e8"/>
    <rect x="130" y="164" width="30" height="26" fill="#ff9f43"/>
    <rect x="160" y="164" width="30" height="26" fill="#fff7e8"/>
    <rect x="190" y="164" width="30" height="26" fill="#e8416b"/>
    <rect x="220" y="164" width="30" height="26" fill="#fff7e8"/>
    <rect x="250" y="164" width="30" height="26" fill="${stripeColour}"/>
    <rect x="280" y="164" width="30" height="26" fill="#fff7e8"/>
    <rect x="310" y="164" width="30" height="26" fill="#ff9f43"/>
    <rect x="340" y="164" width="30" height="26" fill="#fff7e8"/>
    <rect x="370" y="164" width="30" height="26" fill="#e8416b"/>
    <rect x="400" y="164" width="30" height="26" fill="#fff7e8"/>
    <rect x="430" y="164" width="30" height="26" fill="#ff9f43"/>
    <rect x="460" y="164" width="30" height="26" fill="#fff7e8"/>
    <rect x="70" y="164" width="420" height="26" fill="none" stroke="#5a3517" stroke-width="2"/>
    <g>
      <rect x="240" y="196" width="80" height="44" rx="6" fill="#fff7e8" stroke="#5a3517" stroke-width="3"/>
      <text x="280" y="224" text-anchor="middle" font-family="Trebuchet MS, sans-serif" font-size="17" font-weight="bold" fill="${signColour}">${signWord}</text>
      <line x1="250" y1="196" x2="250" y2="188" stroke="#5a3517" stroke-width="2"/>
      <line x1="310" y1="196" x2="310" y2="188" stroke="#5a3517" stroke-width="2"/>
    </g>
    <rect x="80" y="300" width="300" height="70" rx="6" fill="#8a5a2b"/>
    <rect x="80" y="300" width="300" height="12" rx="6" fill="#a06a35"/>
    <line x1="100" y1="370" x2="100" y2="408" stroke="#5a3517" stroke-width="8"/>
    <line x1="360" y1="370" x2="360" y2="408" stroke="#5a3517" stroke-width="8"/>
    <circle cx="140" cy="288" r="14" fill="#ff9f43"/><circle cx="170" cy="292" r="14" fill="#e8416b"/>
    <circle cx="200" cy="288" r="13" fill="#ff9f43"/><circle cx="155" cy="306" r="13" fill="#f5c542"/>
    <circle cx="185" cy="308" r="13" fill="#e8416b"/>${extraOrange}
    <rect x="300" y="262" width="26" height="46" rx="5" fill="#bcd3ff" stroke="#5a7396" stroke-width="2"/>
    <rect x="300" y="262" width="26" height="10" rx="5" fill="#8aa8d8"/>${flower}
    <rect x="330" y="272" width="22" height="36" rx="5" fill="#c9a06a" stroke="#5a3517" stroke-width="2"/>
    <rect x="0" y="408" width="560" height="12" fill="#241a12"/>
    <ellipse cx="452" cy="372" rx="46" ry="26" fill="#3a2c22"/>
    <circle cx="430" cy="348" r="20" fill="#3a2c22"/>
    <path d="M 414 334 l 6 -12 l 8 10 Z" fill="#3a2c22"/>
    <path d="M 438 332 l 8 -10 l 6 12 Z" fill="#3a2c22"/>
    <circle cx="424" cy="346" r="2.5" fill="#f5c542"/>${tail}
    <ellipse cx="470" cy="398" rx="30" ry="6" fill="#000" opacity="0.25"/>
    <ellipse cx="200" cy="398" rx="120" ry="6" fill="#000" opacity="0.25"/>
    `;
  },
};
