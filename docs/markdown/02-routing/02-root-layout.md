<!-- .slide: class="two-column with-code " -->

# Layouts

## Root Layout

This layout is **required**

It allows to define the initial HTML structure returned from the server

Must contain html and body tags

##--##

<br/> <br/>

```jsx
type RootLayoutProps = {
  children: React.ReactNode,
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
```
