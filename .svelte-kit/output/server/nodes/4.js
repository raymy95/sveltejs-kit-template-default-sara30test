import * as universal from '../entries/pages/card/_slug_/_page.js';
import * as server from '../entries/pages/card/_slug_/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/card/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/card/[slug]/+page.js";
export { server };
export const server_id = "src/routes/card/[slug]/+page.server.js";
export const imports = ["_app/immutable/nodes/4.Dl30xQ0P.js","_app/immutable/chunks/DgjOo8wN.js","_app/immutable/chunks/BqvGGWAT.js","_app/immutable/chunks/BF1wp9im.js","_app/immutable/chunks/BEp_Ta8H.js","_app/immutable/chunks/B9QI8j-U.js","_app/immutable/chunks/BpJ3m2fZ.js"];
export const stylesheets = ["_app/immutable/assets/4.BwVJbKdh.css"];
export const fonts = [];
