import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
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
//# sourceMappingURL=client.js.map