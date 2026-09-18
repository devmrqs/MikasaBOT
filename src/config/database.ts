import mongoose from "mongoose";

export async function connectDatabase() {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    console.error("[database] MONGODB_URI não definido no .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("[database] conectado ao MongoDB");
  } catch (error) {
    console.error("[database] erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}
