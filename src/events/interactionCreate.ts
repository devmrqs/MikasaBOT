import type { BotEvent } from "../types/event.js";
import type { Client, Interaction } from "discord.js";

const event: BotEvent<"interactionCreate"> = {
  name: "interactionCreate",
  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const client = interaction.client as Client;
    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.warn(
        `[commands] comando "${interaction.commandName}" não encontrado`,
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(
        `[commands] erro ao executar "${interaction.commandName}":`,
        error,
      );

      const errorReply = {
        content: "Deu ruim ao executar esse comando. Tenta de novo mais tarde.",
        ephemeral: true,
      };

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorReply);
      } else {
        await interaction.reply(errorReply);
      }
    }
  },
};

export default event;
