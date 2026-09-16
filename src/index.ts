import "dotenv/config";
import { client } from "./config/client.js";

const { DISCORD_TOKEN } = process.env;

if (!DISCORD_TOKEN) {
  console.error("[bot] DISCORD_TOKEN não definido no .env");
  process.exit(1);
}

client.once("clientReady", () => {
  console.log(`[bot] logado como ${client.user?.tag}`);
});

client.login(DISCORD_TOKEN);
