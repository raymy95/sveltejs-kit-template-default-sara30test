import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true,
			split:true
		}),
		paths: {
			base: '',
			relative: false
		},
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore all 404s
				if (message.includes('Not found')) {
					return;
				}
				// Otherwise fail the build
				throw new Error(message);
			}
		}
	}
};

export default config;