import * as universal from '../entries/pages/about/_page.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/about/+page.js";
export const imports = ["_app/immutable/nodes/3.QlcSgrMD.js","_app/immutable/chunks/kcvwF34I.js","_app/immutable/chunks/BqvGGWAT.js","_app/immutable/chunks/DgjOo8wN.js","_app/immutable/chunks/DolXfUYJ.js","_app/immutable/chunks/BpJ3m2fZ.js"];
export const stylesheets = [];
export const fonts = [];
