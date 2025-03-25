import { Q as ensure_array_like, P as head, C as attr, O as stringify } from "../../../chunks/index2.js";
import "../../../chunks/client.js";
const images = [
  {
    cardId: "1",
    url: "https://picsum.photos/400/300?random=1",
    alt: "Random image 1"
  },
  {
    cardId: "2",
    url: "https://picsum.photos/400/300?random=2",
    alt: "Random image 2"
  },
  {
    cardId: "3",
    url: "https://picsum.photos/400/300?random=3",
    alt: "Random image 3"
  }
];
function _page($$payload) {
  const each_array = ensure_array_like(images);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Collection</title>`;
    $$payload2.out += `<meta name="description" content="Your collection page">`;
  });
  $$payload.out += `<div class="container svelte-oath83"><h1 class="svelte-oath83">Collection</h1> <div class="image-grid svelte-oath83"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let image = each_array[$$index];
    $$payload.out += `<a${attr("href", `/card/${stringify(image.cardId)}`)}><div class="image-container svelte-oath83"><img${attr("src", image.url)}${attr("alt", image.alt)} loading="lazy" class="svelte-oath83"></div></a>`;
  }
  $$payload.out += `<!--]--></div></div>`;
}
export {
  _page as default
};
