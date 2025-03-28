const prerender = false;
async function load({ parent }) {
  await parent();
  return {};
}
export {
  load,
  prerender
};
