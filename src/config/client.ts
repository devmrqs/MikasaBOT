import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
import type { Command } from "../types/command.js";

declare module "discord.js" {
  interface Client {
    commands: Collection<string, Command>;
  }
}

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Channel, Partials.Message],
});

client.commands = new Collection();
