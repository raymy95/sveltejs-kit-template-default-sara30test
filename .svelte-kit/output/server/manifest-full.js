export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["_redirects","favicon.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.BfhQInYj.js",app:"_app/immutable/entry/app.y0Ye1PAx.js",imports:["_app/immutable/entry/start.BfhQInYj.js","_app/immutable/chunks/BYdse5x5.js","_app/immutable/chunks/B7pVfImq.js","_app/immutable/chunks/BHCZFSv4.js","_app/immutable/entry/app.y0Ye1PAx.js","_app/immutable/chunks/C_PPKRUY.js","_app/immutable/chunks/B7pVfImq.js","_app/immutable/chunks/BHCZFSv4.js","_app/immutable/chunks/C49klihd.js","_app/immutable/chunks/C7ddXOl0.js","_app/immutable/chunks/NZTpNUN0.js","_app/immutable/chunks/hx4sYJXw.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/auth",
				pattern: /^\/api\/auth\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/_server.js'))
			},
			{
				id: "/api/cards",
				pattern: /^\/api\/cards\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/cards/_server.js'))
			},
			{
				id: "/api/cards/unlock",
				pattern: /^\/api\/cards\/unlock\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/cards/unlock/_server.js'))
			},
			{
				id: "/card/[slug]",
				pattern: /^\/card\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/collection",
				pattern: /^\/collection\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/error",
				pattern: /^\/error\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/score",
				pattern: /^\/score\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
