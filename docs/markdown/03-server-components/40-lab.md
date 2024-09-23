<!-- .slide: class="exercice" -->

# 03.02 - Server Components

## Lab

<small>

**1. Client to Server conversion :** The `ExpensesTable` is a client component, it can be optimized

- Delete the `use client` directive and analyze the error
- Find a way to make this component interactive while keeping the majority on the server side

**2. Dark theme is working, but not completly** : Some components needs to dynamically get the theme value

- Create a `ThemeProvider` component which will share the user's theme preference in a context
- Subscribe to this context to update the application logo

<br/> <br/>
**ℹ️ Running the lab**<br/>
`npm run dev -w 03.02`

</small>
