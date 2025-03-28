import * as universal from '../entries/pages/score/_page.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/score/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/score/+page.js";
export const imports = ["_app/immutable/nodes/8.B3elOtgF.js","_app/immutable/chunks/NZTpNUN0.js","_app/immutable/chunks/BBjpR9ww.js","_app/immutable/chunks/B7pVfImq.js","_app/immutable/chunks/C49klihd.js","_app/immutable/chunks/C7ddXOl0.js","_app/immutable/chunks/C_PPKRUY.js","_app/immutable/chunks/BHCZFSv4.js","_app/immutable/chunks/BWaKuXpU.js","_app/immutable/chunks/C3auQ9ac.js","_app/immutable/chunks/DcBDN0ri.js","_app/immutable/chunks/C2mqf3jC.js","_app/immutable/chunks/Bc2Ar4ZF.js"];
export const stylesheets = ["_app/immutable/assets/8.CaeboiyT.css"];
export const fonts = [];
