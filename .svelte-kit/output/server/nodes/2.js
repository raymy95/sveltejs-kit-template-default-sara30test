import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.DZWgfOEg.js","_app/immutable/chunks/DgjOo8wN.js","_app/immutable/chunks/BqvGGWAT.js","_app/immutable/chunks/DolXfUYJ.js","_app/immutable/chunks/BF1wp9im.js","_app/immutable/chunks/BEp_Ta8H.js","_app/immutable/chunks/B9QI8j-U.js","_app/immutable/chunks/BpJ3m2fZ.js","_app/immutable/chunks/t0Rk3l2Z.js","_app/immutable/chunks/DXAzL4kY.js","_app/immutable/chunks/CMf9uXjC.js","_app/immutable/chunks/C09VzrSt.js","_app/immutable/chunks/1VidrSLw.js","_app/immutable/chunks/DdlnurpR.js","_app/immutable/chunks/D5Nmj9bZ.js"];
export const stylesheets = ["_app/immutable/assets/2.sTI-GHXi.css"];
export const fonts = [];
