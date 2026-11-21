// The three levels, in order of difficulty. Each scene module owns its own
// drawing and its own list of differences; this registry only orders them.

import { market } from './scenes/market.js';
import { workshop } from './scenes/workshop.js';
import { garden } from './scenes/garden.js';

export const LEVELS = [market, workshop, garden];

export function levelAt(index) {
  return LEVELS[index] ?? LEVELS[0];
}
