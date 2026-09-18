import { Router } from "express";
import { client } from "../config/client.js";
import { requireAuth } from "../middlewares/requireAuth.js";

export const guildsRouter = Router();

const ADMINISTRATOR = 0x8;

guildsRouter.get("/", requireAuth, async (req, res) => {
  const accessToken = req.session.discordAccessToken!;

  const guildsResponse = await fetch(
    "https://discord.com/api/users/@me/guilds",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  if (!guildsResponse.ok) {
    res.status(400).json({ error: "Falha ao buscar servidores no Discord." });
    return;
  }

  const userGuilds = (await guildsResponse.json()) as Array<{
    id: string;
    name: string;
    icon: string | null;
    permissions: string;
  }>;

  const adminGuilds = userGuilds.filter(
    (guild) => (Number(guild.permissions) & ADMINISTRATOR) === ADMINISTRATOR,
  );

  const guildsWithBot = adminGuilds
    .filter((guild) => client.guilds.cache.has(guild.id))
    .map((guild) => ({
      id: guild.id,
      name: guild.name,
      icon: guild.icon,
    }));

  res.json(guildsWithBot);
});
