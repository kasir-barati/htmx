/// <reference path="./global.d.ts" />
// @ts-check

document.body.addEventListener("htmx:confirm", function (event) {
  if (isRegisterForm()) {
    event.preventDefault();

    isGoogleRecaptchaReady()
      .then(() =>
        grecaptcha.enterprise.execute(
          "6LekL3YqAAAAADkqoVeXZ5qXPz8vhi94czjufdR_",
          { action: "REGISTER" }
        )
      )
      .then((token) => {
        const googleRecaptchaTokenHiddenInput = document.getElementById(
          "googleRecaptchaToken"
        );

        if (!googleRecaptchaTokenHiddenInput) {
          throw "Oops, could not find google reCAPTCHA hidden input!";
        }

        googleRecaptchaTokenHiddenInput.setAttribute("value", token);
      })
      .then(() => {
        event.detail.issueRequest();
      });
  }

  function isRegisterForm() {
    // @ts-ignore
    return event.target.matches(
      '[hx-post="http://localhost:3000/users/register"]'
    );
  }
});

function isGoogleRecaptchaReady() {
  return new Promise((resolve, _reject) => {
    grecaptcha.enterprise.ready(() => {
      resolve(undefined);
    });
  });
}
