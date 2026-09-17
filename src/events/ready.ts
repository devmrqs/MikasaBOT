import type { BotEvent } from "../types/event.js";
import type { Client } from "discord.js";

const event: BotEvent<"clientReady"> = {
  name: "clientReady",
  once: true,
  execute(client: Client<true>) {
    console.log(`[bot] logado como ${client.user.tag}`);
  },
};

export default event;
