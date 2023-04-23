import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "production", "test"]),
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(_env.error.format());

  throw new Error("Invalid env");
}

export const env = _env.data;
