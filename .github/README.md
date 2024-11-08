# Todo

A simple Fullstack app written in ExpressJS + htmx. It is really fun to work with htmx. **I also wrote a dev.to post about it. You can read it [here](https://dev.to/kasir-barati/htmx-and-expressjs-36dk)**.
It has two main pages right now:

- Index.
- Register.

> [!NOTE]
>
> But it also has its own downside. Like when your backend should serve other clients other than htmx, then what? because as you can see in my code I am returning HTML as response. But nonetheless it is a very intriguing approach to developing web applications.

## Docs

Please read in the order defined here, unless you're no beginner in htmx.

1. [htmx intro](./docs/what-is-the-fuss.md).
2. [reCAPTCHA](./docs/recaptcha.md).

## How to run it

1. `cd backend`.
2. `pnpm install`.
3. `cp .env.example .env` and replace the values with what should they actually be.
4. `pnpm dev`.
5. You can open one of the following files in your browser then:
   - `frontend/index.html`.
   - `frontend/register.html`.

Now you should be good to go, try to remove, add or check some of the todos ;).

## How to have syntax highlight in backend?

Install this extension in your VSCode: https://marketplace.visualstudio.com/items?itemName=antonnyman.vscode-js-html-highlight

## Docs

1. [What is this HTMX](./docs/what-is-the-fuss.md).

## Some good tuts on YouTube

- [HTMX for Beginners](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gnEsXRqdY4e_xNy9GK7aQR).
