import * as universal from '../entries/pages/collection/_page.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/collection/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/collection/+page.js";
export const imports = ["_app/immutable/nodes/5.DjHw7UUD.js","_app/immutable/chunks/kcvwF34I.js","_app/immutable/chunks/BqvGGWAT.js","_app/immutable/chunks/DgjOo8wN.js","_app/immutable/chunks/DolXfUYJ.js","_app/immutable/chunks/BpJ3m2fZ.js","_app/immutable/chunks/t0Rk3l2Z.js","_app/immutable/chunks/B9QI8j-U.js","_app/immutable/chunks/K-urNrHL.js","_app/immutable/chunks/C09VzrSt.js"];
export const stylesheets = ["_app/immutable/assets/5.CeHLc_3x.css"];
export const fonts = [];
