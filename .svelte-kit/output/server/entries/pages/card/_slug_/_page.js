import "../../../../chunks/index.js";
const prerender = false;
function load({ params }) {
  return {
    cardId: params.slug
  };
}
export {
  load,
  prerender
};
