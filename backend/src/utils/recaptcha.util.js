// @ts-check
import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";
import { isNumeric } from "./is-numeric.util.js";
import { getEnv } from "./env.util.js";

/**
 * @description Create an assessment to analyze the risk of a UI action.
 * @todo
 * Either:
 * - Cache the client generation code (recommended).
 * - Or call `client.close()` before exiting the method.
 * BTW this is just a simple demo but the best approach would be to use `using` and `Symbol.disposable` syntax.
 *
 * @param {object} param0
 * @param {string} param0.projectId Your Google Cloud Project ID.
 * @param {string} param0.recaptchaKey The reCAPTCHA key associated with the site/app.
 * @param {string} param0.token The generated token obtained from the client.
 * @param {string} param0.recaptchaAction Action name corresponding to the token.
 * @returns {Promise<number> | never}
 */
export async function createAssessment({
  projectId,
  recaptchaKey,
  token,
  recaptchaAction,
}) {
  const { googleApiKey } = getEnv();
  const client = new RecaptchaEnterpriseServiceClient({ apiKey: googleApiKey });
  const projectPath = client.projectPath(projectId);
  const request = {
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  };
  // Learn more about the response: https://cloud.google.com/recaptcha/docs/interpret-assessment-website
  const [response] = await client.createAssessment(request);

  if (!isTokenValid(response)) {
    // @ts-ignore
    const invalidReason = response.tokenProperties.invalidReason;

    throw `The CreateAssessment call failed because the token was: ${invalidReason}`;
  }

  if (!isTheExpectedAction(response, recaptchaAction)) {
    throw "The action attribute in your reCAPTCHA tag does not match the action you are expecting to score";
  }

  // For more information on interpreting the assessment, see: https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
  const recaptchaScore = response.riskAnalysis.score;
  // response.riskAnalysis.reasons can be used to delve into details about how the score was calculated.

  if (!isNumeric(recaptchaScore)) {
    throw "Non-number score!";
  }

  await client.close();

  return recaptchaScore;
}

/**
 *
 * @param {import("@google-cloud/recaptcha-enterprise/build/protos/protos").google.cloud.recaptchaenterprise.v1.IAssessment} response
 * @returns {boolean}
 */
function isTokenValid(response) {
  return Boolean(response.tokenProperties.valid);
}
/**
 *
 * @param {import("@google-cloud/recaptcha-enterprise/build/protos/protos").google.cloud.recaptchaenterprise.v1.IAssessment} response
 * @param {string} recaptchaAction
 * @returns {boolean}
 */
function isTheExpectedAction(response, recaptchaAction) {
  return response.tokenProperties.action === recaptchaAction;
}

/**
 * @description Your project when it is in free plan will only receive: 0.1, 0.3, 0.7, and 0.9.
 *
 * @param {number} score Ranges from 0.0 to 1.0
 * @returns {boolean}
 */
export function isBot(score) {
  return score < 0.7;
}
