<!-- .slide: class="two-column with-code " -->

# Navigating

## Shallow routing

**using `window.history` native API** :

- window.history.pushState
- window.history.replaceState

##--##

<br/>
<br/>
<br/>

Example :

```jsx
'use client';

const Component = () => {
  const handleClick = () => {
    window.history.pushState(null, '', `?allResults=true`);
  };
  return <button onClick={handleClick}>Show all results</button>;
};
```
