<!-- .slide: class="two-column with-code " -->

# Streaming

## Notes & Limitations

- Status codes : Streamed pages will always respond with a status code of 200, which cannot be changed later.

- Page metadata : Next.js will wait for **generateMetadata** to resolve before streaming the page

- React streaming needs JavaScript : check the impacts on the users and SEO
