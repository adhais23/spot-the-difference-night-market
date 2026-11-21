// Spot the Difference — hand-in program (Node 22, standard library only).
// The game itself is plain static files under game/ (index.html plus ES
// modules, no library, no network request), and this program hands it in:
// it copies game/ and screenshots/ from beside this file into the output
// directory and writes dossier.json there with the vendored make.fun
// library's buildDossier, exactly as the gate rebuilds it. Outside the
// grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync, chmodSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail loudly instead of handing in a half-empty output: the game folder and
// the screenshots are the whole entry, so refuse to run without either.
for (const needed of ['game', 'screenshots']) {
  if (!existsSync(join(here, needed))) {
    throw new Error(`missing ${needed}/ beside main.ts — nothing to hand in`);
  }
}
if (!existsSync(join(here, 'game', 'index.html'))) {
  throw new Error('missing game/index.html — the game has no entry page');
}

mkdirSync(out, { recursive: true });
cpSync(join(here, 'game'), join(out, 'game'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The sealed scorer's caps, from the competition rules: the dossier text is
// capped at 160 KiB, at most 4 screenshots of 256 KiB each, game/ at most
// 993 files and 48 MiB, every game/ path at most 1000 bytes.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    game_max_files: 993,
    game_max_bytes: 50331648,
    game_path_max_bytes: 1000,
  }),
);

// The scorer collects /output as another user, so every output must be
// readable by everyone: files 0644, folders 0755.
function makeReadable(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) {
      chmodSync(path, 0o755);
      makeReadable(path);
    } else {
      chmodSync(path, 0o644);
    }
  }
}
chmodSync(out, 0o755);
makeReadable(out);

// A one-line receipt on stdout so a run's log shows what was handed in.
const shotCount = readdirSync(join(out, 'screenshots')).length;
const gameCount = readdirSync(join(out, 'game'), { recursive: true }).length;
console.log(`spot-the-difference handed in: ${gameCount} game entries, ${shotCount} screenshots, dossier.json written to ${out}`);
