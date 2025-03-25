const ssr = false;
const prerender = true;
const config = {
  kit: {
    // Handle API routes through Netlify functions
    paths: {
      base: ""
    }
  }
};
export {
  config,
  prerender,
  ssr
};
