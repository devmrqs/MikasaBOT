import "dotenv/config";
import { REST, Routes } from "discord.js";
import { readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import type { Command } from "./types/command.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { DISCORD_TOKEN, CLIENT_ID, DEV_GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !CLIENT_ID) {
  console.error("[deploy] Faltam DISCORD_TOKEN e/ou CLIENT_ID no .env");
  process.exit(1);
}

const commandsPath = path.join(__dirname, "commands");
const commandFiles = readdirSync(commandsPath).filter((file) =>
  file.endsWith(".js"),
);

const commands = [];
for (const file of commandFiles) {
  const filePath = pathToFileURL(path.join(commandsPath, file)).href;
  const { default: command } = (await import(filePath)) as { default: Command };
  commands.push(command.data.toJSON());
}

const rest = new REST().setToken(DISCORD_TOKEN);

try {
  console.log(`[deploy] registrando ${commands.length} comando(s)...`);

  if (DEV_GUILD_ID) {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, DEV_GUILD_ID), {
      body: commands,
    });
    console.log(
      `[deploy] comandos registrados no servidor de dev (${DEV_GUILD_ID})`,
    );
  } else {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log("[deploy] comandos registrados globalmente");
  }
} catch (error) {
  console.error("[deploy] erro ao registrar comandos:", error);
}
