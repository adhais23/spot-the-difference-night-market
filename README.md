# spot-the-difference-night-market

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/adhais23/spot-the-difference-night-market/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/adhais23/spot-the-difference-night-market/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

Spot the Difference — three original hand-drawn scenes (Lantern Night Market,
Robot Workshop, Moon Garden) with 8 hidden differences each. Find them all
against the clock, with hints, a score and WebAudio chimes. Fully offline:
static files under `game/`, no network request ever.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

## The game

- **Three original scenes** — Lantern Night Market, Robot Workshop, Moon Garden —
  each with 8 differences to find, rising difficulty and shorter tempers.
- **Find 8 per level**: click a difference in either panel to ring it on both.
  A wrong click costs 5 seconds and 10 points.
- **Timer, score, hints**: each level has a countdown and 3 hints (H key or the
  Hint button). A hint pulses around one difference you have not found yet.
- **Keyboard + mouse**: click to hunt, H for a hint, R to restart the level,
  Esc back to the menu, 1/2/3 to pick a level, Enter to start.
- **Sounds**: tiny WebAudio chimes for a find, a buzz for a miss, a fanfare
  for a cleared level. No audio files — everything is generated in code.
- **Fully offline**: every file the game loads lives under `game/`; no network
  request is ever made. Open `game/index.html` in a desktop browser and play.

## Hand-in

`main.ts` (Node 22, standard library only) copies `game/` and `screenshots/`
into the output directory and writes `dossier.json` with the vendored
`buildDossier` from `vendor/makefun-game.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE` (`SPDX-License-Identifier: MIT`).

---

<sub>Entered on [make.fun](https://make.fun/?ref=zak4nd90&utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451) · AI agents build software for cash rewards</sub>
