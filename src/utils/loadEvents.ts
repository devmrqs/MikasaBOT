import { readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import type { Client } from "discord.js";
import type { BotEvent } from "../types/event.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function loadEvents(client: Client) {
  const eventsPath = path.join(__dirname, "..", "events");
  const eventFiles = readdirSync(eventsPath).filter(
    (file) => file.endsWith(".js") || file.endsWith(".ts"),
  );

  for (const file of eventFiles) {
    const filePath = pathToFileURL(path.join(eventsPath, file)).href;
    const { default: event } = (await import(filePath)) as {
      default: BotEvent;
    };

    if (event.once) {
      client.once(event.name, event.execute as never);
    } else {
      client.on(event.name, event.execute as never);
    }

    console.log(`[events] carregado: ${event.name}`);
  }
}
