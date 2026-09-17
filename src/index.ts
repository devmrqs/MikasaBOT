import "dotenv/config";
import { client } from "./config/client.js";
import { loadEvents } from "./utils/loadEvents.js";
import { loadCommands } from "./utils/loadCommands.js";

const { DISCORD_TOKEN } = process.env;

if (!DISCORD_TOKEN) {
  console.error("[bot] DISCORD_TOKEN não definido no .env");
  process.exit(1);
}

await loadCommands(client);
await loadEvents(client);

client.login(DISCORD_TOKEN);
