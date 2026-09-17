import { readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import type { Client } from "discord.js";
import type { Command } from "../types/command.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function loadCommands(client: Client) {
  const commandsPath = path.join(__dirname, "..", "commands");
  const commandFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith(".js"),
  );

  for (const file of commandFiles) {
    const filePath = pathToFileURL(path.join(commandsPath, file)).href;
    const { default: command } = (await import(filePath)) as {
      default: Command;
    };

    client.commands.set(command.data.name, command);
    console.log(`[commands] carregado: /${command.data.name}`);
  }
}
