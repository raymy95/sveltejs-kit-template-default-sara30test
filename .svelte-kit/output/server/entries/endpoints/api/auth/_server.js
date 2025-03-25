import { j as json } from "../../../../chunks/index.js";
function generatePassword() {
  return "remyremy";
}
async function POST({ request }) {
  const { password } = await request.json();
  const isValid = password === generatePassword();
  return json({ isValid });
}
export {
  POST
};
