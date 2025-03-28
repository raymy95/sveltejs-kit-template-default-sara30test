import { J as head } from "../../../chunks/index3.js";
import "../../../chunks/client.js";
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Access Denied</title>`;
  });
  $$payload.out += `<div class="error-container svelte-1kigsxq"><h1 class="svelte-1kigsxq">Access Denied</h1> <p class="svelte-1kigsxq">You need a valid token to access this site.</p> <p class="svelte-1kigsxq">Please add a valid token to the URL: <code class="svelte-1kigsxq">?token=xxx</code></p></div>`;
}
export {
  _page as default
};
