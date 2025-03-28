import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
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