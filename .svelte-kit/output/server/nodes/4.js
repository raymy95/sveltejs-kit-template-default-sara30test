import * as universal from '../entries/pages/card/_slug_/_page.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/card/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/card/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/4.DgX1qfCn.js","_app/immutable/chunks/EF4Pp1i4.js","_app/immutable/chunks/BYdse5x5.js","_app/immutable/chunks/B7pVfImq.js","_app/immutable/chunks/BHCZFSv4.js","_app/immutable/chunks/NZTpNUN0.js","_app/immutable/chunks/C49klihd.js","_app/immutable/chunks/C7ddXOl0.js","_app/immutable/chunks/C_PPKRUY.js","_app/immutable/chunks/BWaKuXpU.js","_app/immutable/chunks/BQhN11bg.js","_app/immutable/chunks/C3auQ9ac.js","_app/immutable/chunks/hx4sYJXw.js","_app/immutable/chunks/C2mqf3jC.js","_app/immutable/chunks/Bc2Ar4ZF.js"];
export const stylesheets = ["_app/immutable/assets/4.BTUmQOpu.css"];
export const fonts = [];
