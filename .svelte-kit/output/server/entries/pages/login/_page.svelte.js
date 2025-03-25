import { P as head, C as attr, R as attr_class, F as escape_html, B as pop, z as push } from "../../../chunks/index2.js";
import "../../../chunks/auth.js";
import "../../../chunks/client.js";
function _page($$payload, $$props) {
  push();
  let password = "";
  let error = false;
  let loading = false;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Login</title>`;
    $$payload2.out += `<meta name="description" content="Login page">`;
  });
  $$payload.out += `<div class="login-container svelte-1qzg8bg"><div class="login-box svelte-1qzg8bg"><h1 class="svelte-1qzg8bg">Login Required</h1> <form><div class="input-group svelte-1qzg8bg"><label for="password" class="svelte-1qzg8bg">Enter Password</label> <input type="password" id="password"${attr("value", password)} placeholder="Enter the daily password"${attr("disabled", loading, true)}${attr_class("svelte-1qzg8bg", void 0, { "error": error })}></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <button type="submit"${attr("disabled", loading, true)} class="svelte-1qzg8bg">${escape_html("Login")}</button></form></div></div>`;
  pop();
}
export {
  _page as default
};
