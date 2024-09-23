<!-- .slide: class="two-column with-code " -->

# Server Components

## Client vs Server component

But it's a new kind of component

<br/>

<img src="./assets/images/03-server-components/client-vs-server-2.png" style="width: 700px; height: auto;"/>

##--##

<br/>

<div>

This component ...

```jsx
const Homepage = () => {
  return <p>Hello world!</p>;
};
```

... produces this :

```html [7-11]
<!DOCTYPE html>
<html>
  <body>
    <p>Hello world!</p>
    <script src="/static/js/bundle.js"></script>
    <script>
      self.__next['$Homepage-1'] = {
        type: 'p',
        props: null,
        children: 'Hello world!',
      };
    </script>
  </body>
</html>
```

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->