import {
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
} from "discord.js";
import type { CreateMessageInput } from "../schemas/message.schema.js";

type BuildContainerInput = Pick<CreateMessageInput, "blocks" | "accentColor">;

export function buildContainer(input: BuildContainerInput): ContainerBuilder {
  const container = new ContainerBuilder();

  if (input.accentColor) {
    container.setAccentColor(parseInt(input.accentColor.replace("#", ""), 16));
  }

  for (const block of input.blocks) {
    switch (block.type) {
      case "text":
        container.addTextDisplayComponents(
          new TextDisplayBuilder().setContent(block.content),
        );
        break;

      case "separator":
        container.addSeparatorComponents(
          new SeparatorBuilder()
            .setDivider(true)
            .setSpacing(SeparatorSpacingSize.Small),
        );
        break;
    }
  }

  return container;
}
