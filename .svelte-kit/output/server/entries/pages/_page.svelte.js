import { J as head, F as store_get, G as escape_html, D as attr, I as unsubscribe_stores, B as pop, z as push } from "../../chunks/index3.js";
import "../../chunks/client.js";
import { a as auth } from "../../chunks/auth.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let username = "";
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Card Collection Game</title>`;
    $$payload2.out += `<meta name="description" content="Card collection game">`;
  });
  $$payload.out += `<div class="container svelte-1w4obik"><div class="login-box svelte-1w4obik"><h1>Welcome to Card Collection</h1> `;
  if (store_get($$store_subs ??= {}, "$auth", auth).username) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="welcome-back svelte-1w4obik"><h2 class="svelte-1w4obik">Welcome back, ${escape_html(store_get($$store_subs ??= {}, "$auth", auth).username)}!</h2> <p>Ready to continue your collection?</p> <button class="svelte-1w4obik">Go to Collection</button></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="input-group svelte-1w4obik"><input type="text"${attr("value", username)} placeholder="Enter your username" class="svelte-1w4obik"> <button class="svelte-1w4obik">Start Playing</button></div> `;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
