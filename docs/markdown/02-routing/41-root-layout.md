<!-- .slide: class="two-column with-code " -->

# Routing

## Root layout

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

Notes:

Layout un peu particulier : le root, qui est obligatoire

Permet de définir la structure de base partagée par tout le site
