import { r as redirect } from "../../../chunks/index.js";
const VALID_TOKEN = "remyremy";
function isValidToken(token) {
  return token === VALID_TOKEN;
}
const prerender = false;
function load({ url }) {
  const token = url.searchParams.get("token");
  if (!token || !isValidToken(token)) {
    throw redirect(303, "/error");
  }
  return {
    token
  };
}
export {
  load,
  prerender
};
