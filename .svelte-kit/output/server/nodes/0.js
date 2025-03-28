import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.BxClLFH7.js","_app/immutable/chunks/NZTpNUN0.js","_app/immutable/chunks/B7pVfImq.js","_app/immutable/chunks/C7ddXOl0.js","_app/immutable/chunks/C_PPKRUY.js","_app/immutable/chunks/BHCZFSv4.js","_app/immutable/chunks/C49klihd.js","_app/immutable/chunks/BQhN11bg.js","_app/immutable/chunks/BYdse5x5.js","_app/immutable/chunks/C3auQ9ac.js","_app/immutable/chunks/C2mqf3jC.js","_app/immutable/chunks/Bc2Ar4ZF.js"];
export const stylesheets = ["_app/immutable/assets/0.BL6qScVn.css"];
export const fonts = ["_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.B04YIrm4.woff2","_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.0xXfcOOq.woff","_app/immutable/assets/fira-mono-cyrillic-400-normal.36-45Uyg.woff2","_app/immutable/assets/fira-mono-cyrillic-400-normal.Dq7SlH2J.woff","_app/immutable/assets/fira-mono-greek-ext-400-normal.CsqI23CO.woff2","_app/immutable/assets/fira-mono-greek-ext-400-normal.BEhC8Nsh.woff","_app/immutable/assets/fira-mono-greek-400-normal.C3zng6O6.woff2","_app/immutable/assets/fira-mono-greek-400-normal.DUeQbRz0.woff","_app/immutable/assets/fira-mono-latin-ext-400-normal.D6XfiR-_.woff2","_app/immutable/assets/fira-mono-latin-ext-400-normal.lWlD_NAB.woff","_app/immutable/assets/fira-mono-latin-400-normal.DKjLVgQi.woff2","_app/immutable/assets/fira-mono-latin-400-normal.g4W12wf9.woff"];
