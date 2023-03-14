import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "production", "test"]),
  PORT: z.coerce.number(),
});

const _env = envSchema.safeParse(process.env);
