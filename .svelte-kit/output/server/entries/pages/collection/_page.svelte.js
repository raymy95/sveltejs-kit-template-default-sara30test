import { J as head, F as store_get, I as unsubscribe_stores, B as pop, z as push } from "../../../chunks/index3.js";
import "../../../chunks/client.js";
import { a as auth } from "../../../chunks/auth.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Card Collection</title>`;
    $$payload2.out += `<meta name="description" content="Your card collection">`;
  });
  $$payload.out += `<div class="container svelte-1tqkg55"><h1>Your Card Collection</h1> `;
  if (!store_get($$store_subs ??= {}, "$auth", auth).isAuthenticated) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="login-prompt svelte-1tqkg55"><p>Please log in to view and unlock cards.</p> <button class="svelte-1tqkg55">Go to Login</button></div>`;
  } else {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<p>Loading cards...</p>`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
