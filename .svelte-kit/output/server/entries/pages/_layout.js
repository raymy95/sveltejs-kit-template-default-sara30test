const ssr = false;
const prerender = false;
function load({ url }) {
  const token = url.searchParams.get("token");
  if (url.pathname === "/error") {
    return {};
  }
  if (!token) {
    return {
      error: "No token provided",
      redirect: "/error"
    };
  }
  return {
    token
  };
}
export {
  load,
  prerender,
  ssr
};
