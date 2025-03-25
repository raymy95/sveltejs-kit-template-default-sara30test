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
		client: {start:"_app/immutable/entry/start.BlBDe1s3.js",app:"_app/immutable/entry/app.CmlpZ3rC.js",imports:["_app/immutable/entry/start.BlBDe1s3.js","_app/immutable/chunks/K-urNrHL.js","_app/immutable/chunks/BqvGGWAT.js","_app/immutable/chunks/C09VzrSt.js","_app/immutable/entry/app.CmlpZ3rC.js","_app/immutable/chunks/BqvGGWAT.js","_app/immutable/chunks/BF1wp9im.js","_app/immutable/chunks/BEp_Ta8H.js","_app/immutable/chunks/B9QI8j-U.js","_app/immutable/chunks/BpJ3m2fZ.js","_app/immutable/chunks/DgjOo8wN.js","_app/immutable/chunks/CSufngwG.js","_app/immutable/chunks/CMf9uXjC.js","_app/immutable/chunks/C09VzrSt.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/api/auth",
				pattern: /^\/api\/auth\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/_server.js'))
			},
			{
				id: "/card/[slug]",
				pattern: /^\/card\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set(["/","/about","/collection","/login","/score"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
