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

Notes:

Solution à ça : les server component

Ils ne s'éxécutent que côté serveur

L'application n'est plus hydratée entièrement

Donc ils ne génèrent pas de JavaScript

Ils ne génèrent non pas du HTML, mais un "RSC payload" qui est la représentation du server component et de son arbo

C'est ce qui permet une communication client / server, et à l'hydration sélective de s'y retrouver

Présentation sur un site en live
