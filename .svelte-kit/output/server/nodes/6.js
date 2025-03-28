import * as universal from '../entries/pages/error/_page.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/error/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/error/+page.js";
export const imports = ["_app/immutable/nodes/6.APJeJgQQ.js","_app/immutable/chunks/NZTpNUN0.js","_app/immutable/chunks/BBjpR9ww.js","_app/immutable/chunks/B7pVfImq.js","_app/immutable/chunks/C7ddXOl0.js","_app/immutable/chunks/BYdse5x5.js","_app/immutable/chunks/BHCZFSv4.js"];
export const stylesheets = ["_app/immutable/assets/6.DRJ8d_H_.css"];
export const fonts = [];
