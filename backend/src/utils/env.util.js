// @ts-check
import { join } from "path";
import { config } from "dotenv";

export function loadEnv() {
  config({ path: join(import.meta.dirname, "..", "..", ".env") });
}
export function getEnv() {
  if (!process.env.RECAPTCHA_KEY) {
    throw "Undefined process.env.RECAPTCHA_KEY";
  }
  if (!process.env.RECAPTCHA_PROJECT_ID) {
    throw "Undefined process.env.RECAPTCHA_PROJECT_ID";
  }
  if (!process.env.GOOGLE_API_KEY) {
    throw "Undefined process.env.GOOGLE_API_KEY";
  }

  return {
    googleApiKey: process.env.GOOGLE_API_KEY,
    recaptchaGoogleKey: process.env.RECAPTCHA_KEY,
    recaptchaGoogleProjectId: process.env.RECAPTCHA_PROJECT_ID,
  };
}
