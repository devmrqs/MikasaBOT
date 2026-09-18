import "express-session";

declare module "express-session" {
  interface SessionData {
    discordAccessToken?: string;
    discordUserId?: string;
  }
}
