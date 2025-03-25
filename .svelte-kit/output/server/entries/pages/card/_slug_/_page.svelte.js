import { P as head, F as escape_html, B as pop, z as push } from "../../../../chunks/index2.js";
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Carte</title>`;
    $$payload2.out += `<meta name="description" content="Carte">`;
  });
  $$payload.out += `<div class="container svelte-oath83"><h1 class="svelte-oath83">Carte</h1> <h1 class="svelte-oath83">${escape_html(data.cardId)}</h1></div>`;
  pop();
}
export {
  _page as default
};
