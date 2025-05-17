<!-- .slide: class="two-column with-code " -->

# 1. Error boundaries

## What if I need to be more granular?

You can still create a custom ErrorBoundary old-school Class Component :

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log error & stacktrace
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
```

##--##

<br/> <br/>

_Note : there is no way to implement it using a function component_ <br/><br/>
But you don't have to implement the component yourself. Libraries do it for you :

```bash
npm install react-error-boundary
```
