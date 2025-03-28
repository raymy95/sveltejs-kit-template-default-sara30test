import { j as json } from "../../../../chunks/index.js";
const prerender = false;
const config = {
  cors: {
    origin: "*",
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  }
};
function generatePassword() {
  return "remyremy";
}
async function POST({ request }) {
  const { password } = await request.json();
  const isValid = password === generatePassword();
  return json({ isValid }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}
async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}
export {
  OPTIONS,
  POST,
  config,
  prerender
};
