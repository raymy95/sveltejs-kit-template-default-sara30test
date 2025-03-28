import { j as json } from "../../../../../chunks/index.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const cards = [{ "id": "1", "name": "Dragon's Breath", "image": "https://picsum.photos/400/300?random=1", "description": "A powerful dragon breathing fire", "rarity": "rare", "unlockPassword": "dragon123" }, { "id": "2", "name": "Mystic Wizard", "image": "https://picsum.photos/400/300?random=2", "description": "A wise wizard casting spells", "rarity": "uncommon", "unlockPassword": "wizard456" }, { "id": "3", "name": "Forest Spirit", "image": "https://picsum.photos/400/300?random=3", "description": "A peaceful spirit of the forest", "rarity": "common", "unlockPassword": "spirit789" }];
const cardsData = {
  cards
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const usersPath = join(__dirname, "../../../../lib/data/users.json");
async function POST({ request }) {
  const { username, cardId, password } = await request.json();
  try {
    const card = cardsData.cards.find((c) => c.id === cardId);
    if (!card || card.unlockPassword !== password) {
      return json({ success: false });
    }
    let usersData = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
    if (!usersData.users[username]) {
      usersData.users[username] = { unlockedCards: [] };
    }
    if (!usersData.users[username].unlockedCards.includes(cardId)) {
      usersData.users[username].unlockedCards.push(cardId);
    }
    fs.writeFileSync(usersPath, JSON.stringify(usersData, null, 2));
    return json({ success: true });
  } catch (error) {
    console.error("Error unlocking card:", error);
    return json({ success: false });
  }
}
export {
  POST
};
