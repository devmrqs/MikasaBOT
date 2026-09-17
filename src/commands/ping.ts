import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
} from "discord.js";
import type { Command } from "../types/command.js";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription(
      "Verifica se o bot está online e a latência com o Discord.",
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const sent = await interaction.reply({
      content: "Calculando...",
      fetchReply: true,
    });
    const latency = sent.createdTimestamp - interaction.createdTimestamp;

    await interaction.editReply(
      `🏓 Pong! Latência da mensagem: ${latency}ms | API do Discord: ${Math.round(interaction.client.ws.ping)}ms`,
    );
  },
};

export default command;
