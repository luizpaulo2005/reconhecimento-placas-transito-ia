import axios from "axios";
import { env } from "@/lib/env";

const api = axios.create({
  baseURL: `${env.VITE_APP_ROBLOFOW_API_URL}/${env.VITE_APP_ROBLOFOW_API_MODEL_ID}/${env.VITE_APP_ROBLOFOW_API_MODEL_VERSION}`,
});

export { api };
