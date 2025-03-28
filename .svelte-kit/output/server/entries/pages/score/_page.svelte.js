import { J as head, B as pop, z as push } from "../../../chunks/index3.js";
import "../../../chunks/auth.js";
function _page($$payload, $$props) {
  push();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Classement - Card Collection</title>`;
    $$payload2.out += `<meta name="description" content="User rankings">`;
  });
  $$payload.out += `<div class="container svelte-1qv5khf"><h1 class="svelte-1qv5khf">Classement</h1> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="loading svelte-1qv5khf"><p>Loading rankings...</p></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
