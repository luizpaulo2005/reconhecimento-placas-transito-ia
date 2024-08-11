import { z } from "zod";

const envSchema = z.object({
  VITE_APP_ROBLOFOW_API_KEY: z.string(),
  VITE_APP_ROBLOFOW_API_URL: z.string().url(),
  VITE_APP_ROBLOFOW_API_MODEL_ID: z.string(),
  VITE_APP_ROBLOFOW_API_MODEL_VERSION: z.coerce.number(),
});

const env = envSchema.parse(import.meta.env);

export { env }