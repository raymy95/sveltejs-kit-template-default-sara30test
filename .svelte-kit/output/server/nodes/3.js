import * as universal from '../entries/pages/about/_page.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/about/+page.js";
export const imports = ["_app/immutable/nodes/3.B3qjVV8A.js","_app/immutable/chunks/Bc2Ar4ZF.js","_app/immutable/chunks/B7pVfImq.js","_app/immutable/chunks/NZTpNUN0.js","_app/immutable/chunks/BBjpR9ww.js","_app/immutable/chunks/C7ddXOl0.js"];
export const stylesheets = [];
export const fonts = [];
