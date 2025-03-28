import { J as head, B as pop, z as push, G as escape_html } from "../../../../chunks/index3.js";
import "../../../../chunks/client.js";
import "../../../../chunks/auth.js";
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html("Card")} - Card Collection</title>`;
    $$payload2.out += `<meta name="description" content="Card detail view" class="svelte-12a0hyj">`;
  });
  $$payload.out += `<div class="container svelte-12a0hyj">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="loading svelte-12a0hyj"><p class="svelte-12a0hyj">Loading card...</p></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
