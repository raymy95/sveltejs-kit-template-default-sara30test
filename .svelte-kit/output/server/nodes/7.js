import * as universal from '../entries/pages/score/_page.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/score/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/score/+page.js";
export const imports = ["_app/immutable/nodes/7.CtW4t9Xw.js","_app/immutable/chunks/kcvwF34I.js","_app/immutable/chunks/BqvGGWAT.js","_app/immutable/chunks/DgjOo8wN.js","_app/immutable/chunks/DolXfUYJ.js","_app/immutable/chunks/BpJ3m2fZ.js"];
export const stylesheets = ["_app/immutable/assets/4.CBDy0sHo.css"];
export const fonts = [];
