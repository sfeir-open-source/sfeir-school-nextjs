<!-- .slide: class="two-column with-code " -->

<style>
  .loading-53 {
    width: 450px;
    height: auto;
  }
</style>

# Streaming

## loading.tsx

Convention : <br/>
Add a **loading.tsx** file and export a component next to the segment you want to stream <br/><br/>
This component will be displayed while the Promises of the child components are pending :

```jsx
const Loading = () => {
  return <p>Loading...</p>;
};

export default Loading;
```

##--##

<br/> <br/> <br/>

<img src="./assets/images/08-rendering/loading.png" class="loading-53" />
