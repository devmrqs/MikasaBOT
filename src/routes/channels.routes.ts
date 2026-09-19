import { Router } from "express";
import { ChannelType } from "discord.js";
import { client } from "../config/client.js";
import { requireGuildAdmin } from "../middlewares/requireGuildAdmin.js";

export const channelsRouter = Router();

channelsRouter.get(
  "/:guildId/channels",
  requireGuildAdmin,
  async (req, res) => {
    const guildId = req.params.guildId as string;

    const guild = client.guilds.cache.get(guildId);

    if (!guild) {
      res
        .status(404)
        .json({ error: "A Miyu não está presente nesse servidor." });
      return;
    }

    const channels = guild.channels.cache
      .filter((channel) => channel.type === ChannelType.GuildText)
      .map((channel) => ({
        id: channel.id,
        name: channel.name,
      }));

    res.json(channels);
  },
);
