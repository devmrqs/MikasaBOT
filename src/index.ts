import "dotenv/config";
import { client } from "./config/client.js";
import { loadEvents } from "./utils/loadEvents.js";
import { loadCommands } from "./utils/loadCommands.js";
import { connectDatabase } from "./config/database.js";
import { startServer } from "./utils/startServer.js";

process.on("unhandledRejection", (reason) => {
  console.error("[process] promise rejeitada sem tratamento:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("[process] exceção não capturada:", error);
});

const { DISCORD_TOKEN } = process.env;

if (!DISCORD_TOKEN) {
  console.error("[bot] DISCORD_TOKEN não definido no .env");
  process.exit(1);
}

await connectDatabase();
await loadCommands(client);
await loadEvents(client);
startServer();

client.login(DISCORD_TOKEN);
