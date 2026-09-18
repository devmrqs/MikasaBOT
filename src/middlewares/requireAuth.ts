import type { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.discordAccessToken) {
    res.status(401).json({ error: "Não autenticado. Faça login primeiro." });
    return;
  }

  next();
}
