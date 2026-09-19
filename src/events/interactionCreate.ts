import type { BotEvent } from "../types/event.js";
import type { Client, Interaction, InteractionReplyOptions } from "discord.js";
import { MessageFlags } from "discord.js";

const event: BotEvent<"interactionCreate"> = {
  name: "interactionCreate",
  async execute(interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
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

        const errorReply: InteractionReplyOptions = {
          content:
            "Deu ruim ao executar esse comando. Tenta de novo mais tarde.",
          flags: MessageFlags.Ephemeral,
        };

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(errorReply);
        } else {
          await interaction.reply(errorReply);
        }
      }
      return;
    }

    if (interaction.isButton()) {
      await interaction.reply({
        content: `Ação "${interaction.customId}" recebida! (em breve isso vai fazer algo de verdade)`,
        flags: MessageFlags.Ephemeral,
      });
      return;
    }
  },
};

export default event;
