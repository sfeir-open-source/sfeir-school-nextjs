<!-- .slide: class="two-column with-code " -->

# Server components

All components are server-component by default :

Homepage.tsx

```jsx
const Homepage = () => {
  return <p>Hello world!</p>;
};
```

##--##
<br/>
<br/>

Generated HTML

```html
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
