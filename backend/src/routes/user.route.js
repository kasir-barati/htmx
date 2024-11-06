// @ts-check

import { Router } from "express";
import { userRepo } from "../repositories/user.repository.js";
import { createAssessment, isBot } from "../utils/recaptcha.util.js";
import { getEnv } from "../utils/env.util.js";

export const userRoutes = Router();

/**
 * @typedef RegisterDto
 * @type {object}
 * @property {string} email
 * @property {string} password
 * @property {string} googleRecaptchaToken
 * @property {string} recaptchaAction
 */

userRoutes.post("/register", async (req, res) => {
  /**@type {RegisterDto} */
  const { googleRecaptchaToken, recaptchaAction, ...data } = req.body;
  const { recaptchaGoogleKey, recaptchaGoogleProjectId } = getEnv();
  const score = await createAssessment({
    token: googleRecaptchaToken,
    projectId: recaptchaGoogleProjectId,
    recaptchaKey: recaptchaGoogleKey,
    recaptchaAction,
  });

  // Learn more about how to interpret score here: https://cloud.google.com/recaptcha/docs/interpret-assessment-website#interpret_scores
  if (isBot(score)) {
    res
      .status(400)
      .send(
        "<p>You're a Bot! But if you're not please try again. Turn off your VPN or other things that might cause Google to detect you as Bot.</p>"
      );
    return;
  }

  const user = userRepo.create(data);

  res.status(201).send(`
    <p>ID: ${user.id}</p>
    <p>Email: ${user.email}</p>
    <p>Password: ${user.password}</p>
  `);
});
