// Robot Workshop — level 2 (medium). A little robot is being repaired on a
// workbench while gears turn on the wall. Eight differences, sneakier now.

export const workshop = {
  id: 'workshop',
  name: 'Robot Workshop',
  blurb: 'A little robot waits on the workbench while the gears turn above.',
  seconds: 110,

  diffs: [
    { id: 'antenna', label: 'the antenna ball', x: 285, y: 80,  r: 18 },
    { id: 'gear',    label: 'a wall gear',      x: 95,  y: 105, r: 32 },
    { id: 'tool',    label: 'the bench tool',   x: 185, y: 325, r: 26 },
    { id: 'cloud',   label: 'a cloud',          x: 455, y: 70,  r: 24 },
    { id: 'steam',   label: 'the mug steam',    x: 385, y: 295, r: 22 },
    { id: 'eye',     label: "the robot's eye",  x: 272, y: 150, r: 18 },
    { id: 'bolt',    label: 'a shelf bolt',     x: 435, y: 205, r: 18 },
    { id: 'clock',   label: 'the clock hands',  x: 505, y: 165, r: 26 },
  ],

  draw(side) {
    const right = side === 'right';
    const g = `wall-${side}`;
    // The antenna ball is missing on the right.
    const antennaBall = right ? '' : `<circle cx="285" cy="80" r="9" fill="#e8416b"/>`;
    // The wall gear has 8 spokes on the left, 4 on the right.
    const gearSpokes = right
      ? `<line x1="95" y1="75" x2="95" y2="135" stroke="#8a6d3b" stroke-width="6"/><line x1="65" y1="105" x2="125" y2="105" stroke="#8a6d3b" stroke-width="6"/>`
      : `<line x1="95" y1="75" x2="95" y2="135" stroke="#8a6d3b" stroke-width="6"/><line x1="65" y1="105" x2="125" y2="105" stroke="#8a6d3b" stroke-width="6"/><line x1="74" y1="84" x2="116" y2="126" stroke="#8a6d3b" stroke-width="6"/><line x1="116" y1="84" x2="74" y2="126" stroke="#8a6d3b" stroke-width="6"/>`;
    // The bench tool is a wrench on the left, a screwdriver on the right.
    const tool = right
      ? `<rect x="176" y="318" width="18" height="8" rx="3" fill="#e74c3c"/><rect x="158" y="320" width="18" height="4" fill="#bcd3ff"/><rect x="194" y="315" width="8" height="14" rx="2" fill="#f5c542"/>`
      : `<rect x="160" y="318" width="34" height="9" rx="4" fill="#bcd3ff"/><circle cx="200" cy="322" r="8" fill="none" stroke="#bcd3ff" stroke-width="5"/><circle cx="200" cy="322" r="3" fill="#5a7396"/>`;
    // A cloud drifts past the window on the left only.
    const cloud = right ? '' : `<ellipse cx="455" cy="70" rx="22" ry="10" fill="#fff7e8"/><ellipse cx="443" cy="64" rx="12" ry="8" fill="#fff7e8"/><ellipse cx="468" cy="64" rx="12" ry="8" fill="#fff7e8"/>`;
    // Steam rises from the mug on the left only.
    const steam = right ? '' : `<path d="M 380 282 q 4 -8 0 -14 q -4 -6 0 -12" stroke="#fff7e8" stroke-width="3" fill="none" opacity="0.8"/><path d="M 392 282 q 4 -8 0 -14 q -4 -6 0 -12" stroke="#fff7e8" stroke-width="3" fill="none" opacity="0.8"/>`;
    // One robot eye turns red on the right.
    const eyeColour = right ? '#e74c3c' : '#2ecc71';
    // An extra bolt appears on the shelf on the right.
    const extraBolt = right
      ? `<circle cx="435" cy="205" r="7" fill="#8a6d3b"/><circle cx="435" cy="205" r="3" fill="#f5c542"/>`
      : '';
    // The clock reads 3 o'clock on the left, 6 o'clock on the right.
    const clockHands = right
      ? `<line x1="505" y1="165" x2="505" y2="146" stroke="#2b2118" stroke-width="3"/><line x1="505" y1="165" x2="505" y2="180" stroke="#2b2118" stroke-width="3"/>`
      : `<line x1="505" y1="165" x2="505" y2="146" stroke="#2b2118" stroke-width="3"/><line x1="505" y1="165" x2="522" y2="165" stroke="#2b2118" stroke-width="3"/>`;

    return `
    <defs>
      <linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2b3a55"/><stop offset="1" stop-color="#1d2b45"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="560" height="420" fill="url(#${g})"/>
    <rect x="20" y="20" width="180" height="160" rx="8" fill="#7fb3d5" stroke="#5a7396" stroke-width="4"/>
    <line x1="110" y1="20" x2="110" y2="180" stroke="#5a7396" stroke-width="4"/>
    <line x1="20" y1="100" x2="200" y2="100" stroke="#5a7396" stroke-width="4"/>
    <circle cx="70" cy="55" r="16" fill="#f5c542"/><circle cx="70" cy="55" r="22" fill="none" stroke="#f5c542" stroke-width="2" opacity="0.5"/>${cloud}
    <rect x="60" y="120" width="70" height="46" rx="4" fill="#8a6d3b"/>
    <rect x="60" y="120" width="70" height="10" rx="4" fill="#a5824f"/>
    <circle cx="95" cy="105" r="34" fill="#f5c542" stroke="#8a6d3b" stroke-width="4"/>${gearSpokes}
    <circle cx="95" cy="105" r="10" fill="#8a6d3b"/>
    <circle cx="170" cy="70" r="22" fill="#bcd3ff" stroke="#8a6d3b" stroke-width="4"/>
    <line x1="170" y1="48" x2="170" y2="92" stroke="#8a6d3b" stroke-width="5"/>
    <line x1="148" y1="70" x2="192" y2="70" stroke="#8a6d3b" stroke-width="5"/>
    <circle cx="170" cy="70" r="7" fill="#8a6d3b"/>
    <rect x="330" y="120" width="200" height="10" rx="3" fill="#7a4d2b"/>
    <rect x="345" y="130" width="14" height="60" fill="#5a3517"/>
    <rect x="500" y="130" width="14" height="60" fill="#5a3517"/>
    <circle cx="365" cy="112" r="9" fill="#8a6d3b"/><circle cx="365" cy="112" r="4" fill="#f5c542"/>
    <circle cx="395" cy="112" r="9" fill="#8a6d3b"/><circle cx="395" cy="112" r="4" fill="#f5c542"/>${extraBolt}
    <rect x="440" y="96" width="60" height="24" rx="4" fill="#e8416b"/>
    <rect x="440" y="96" width="60" height="8" rx="4" fill="#ff6b9d"/>
    <circle cx="505" cy="165" r="26" fill="#fff7e8" stroke="#5a3517" stroke-width="4"/>
    <circle cx="505" cy="141" r="2" fill="#2b2118"/><circle cx="505" cy="189" r="2" fill="#2b2118"/>
    <circle cx="481" cy="165" r="2" fill="#2b2118"/><circle cx="529" cy="165" r="2" fill="#2b2118"/>${clockHands}
    <circle cx="505" cy="165" r="3" fill="#2b2118"/>
    <rect x="60" y="330" width="440" height="58" rx="6" fill="#8a5a2b"/>
    <rect x="60" y="330" width="440" height="12" rx="6" fill="#a06a35"/>
    <line x1="80" y1="388" x2="80" y2="414" stroke="#5a3517" stroke-width="8"/>
    <line x1="480" y1="388" x2="480" y2="414" stroke="#5a3517" stroke-width="8"/>
    <rect x="250" y="196" width="70" height="80" rx="10" fill="#bcd3ff" stroke="#5a7396" stroke-width="3"/>
    <rect x="262" y="276" width="18" height="54" rx="4" fill="#8aa8d8"/>
    <rect x="290" y="276" width="18" height="54" rx="4" fill="#8aa8d8"/>
    <circle cx="285" cy="150" r="34" fill="#dfe9f5" stroke="#5a7396" stroke-width="3"/>
    <circle cx="272" cy="146" r="8" fill="${eyeColour}"/><circle cx="298" cy="146" r="8" fill="#2ecc71"/>
    <circle cx="272" cy="146" r="3" fill="#fff"/><circle cx="298" cy="146" r="3" fill="#fff"/>
    <rect x="272" y="162" width="26" height="5" rx="2" fill="#5a7396"/>
    <line x1="285" y1="116" x2="285" y2="90" stroke="#5a7396" stroke-width="4"/>${antennaBall}
    <rect x="236" y="210" width="14" height="34" rx="5" fill="#8aa8d8"/>
    <rect x="320" y="210" width="14" height="34" rx="5" fill="#8aa8d8"/>
    <circle cx="243" cy="248" r="7" fill="#e8416b"/><circle cx="327" cy="248" r="7" fill="#e8416b"/>
    <rect x="262" y="222" width="46" height="6" rx="3" fill="#5a7396"/>
    <rect x="262" y="236" width="46" height="6" rx="3" fill="#5a7396"/>
    ${tool}
    <rect x="372" y="296" width="30" height="34" rx="4" fill="#e8416b"/>
    <path d="M 402 304 q 14 4 0 18" stroke="#e8416b" stroke-width="5" fill="none"/>${steam}
    <rect x="420" y="306" width="60" height="24" rx="4" fill="#2ec4b6"/>
    <circle cx="432" cy="318" r="4" fill="#1d7a70"/><circle cx="452" cy="318" r="4" fill="#1d7a70"/><circle cx="470" cy="318" r="4" fill="#1d7a70"/>
    <rect x="0" y="414" width="560" height="6" fill="#241a12"/>
    `;
  },
};
