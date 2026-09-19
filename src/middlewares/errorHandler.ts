import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error("[server] erro não tratado:", err);

  if (res.headersSent) {
    return;
  }

  res.status(500).json({ error: "Erro interno do servidor." });
}
