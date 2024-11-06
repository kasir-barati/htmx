# What's this fuss all about?

- htmx is still another JS lib. So if you hate JS downright from the beginning maybe you should look for something else then :kidding:.
- With htmx we're still making dynamic projects.
- In htmx we focus on hypermedia and utilizing it to build our apps.

  ![Exchanging hypermedia between server and client](./assets/exchanging-hypermedia.png)

- In HTML we have `a` and `form` elements which support hypermedia:

  - ```html
    <h1>The First Page</h1>
    <p>
      If you like, you can switch to the
      <a href="http://www.dr-chuck.com/page2.htm">Second Page</a>
    </p>
    ```

    ![Request response cycle in a browser](https://raw.githubusercontent.com/kasir-barati/html-css/main/05-the-browser-and-the-dom/request-response-cycle.png)

    &mdash; [Ref and learn more about this](https://github.com/kasir-barati/html-css/tree/main/05-the-browser-and-the-dom#tcpip-model).

  - ```html
    <form action="http://example.com/register" method="post"></form>
    ```

  But aside from those two we do not have any other option. Here is where htmx enters the scene. With a flick of its wand and a murmur of ancient words htmx enables us to use hypermedia in almost every element.

## How htmx works

- It adds new html attributes to elements: `hx-*`.
- It expects server to **return hypermedia** and not `JSON`.
- For it to work we need to add a `script` tag to our HTML document. This can be done in two ways:

  - Through their CDN.
  - Download the minified version and link it, which the best way to do it in real world apps.

  &mdash; [Ref](https://htmx.org/docs/#installing).

### `hx-get`

- Triggers a get request to the specified URL.

### `hx-target`

- When the response comes back where htmx should put it will be dictated by this custom htmx attribute:
- Can use any kind of css selector: `.some-class`, `#some-id`, or something like `.class-name > p:nth-child(3)`.

### `hx-swap`

- This tells how it should swap the content with the response:
  - `innerHTML`: Swaps the inner HTML of the element with the response.
  - `outerHTML`: Swaps the the **entire element** with the response.
