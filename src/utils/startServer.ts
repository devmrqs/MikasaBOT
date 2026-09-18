import { app } from "../config/server.js";

export function startServer() {
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  app.listen(port, () => {
    console.log(`[server] rodando em http://localhost:${port}`);
  });
}
