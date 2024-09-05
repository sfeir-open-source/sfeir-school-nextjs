<!-- .slide: class="two-column with-code" -->

<style>
  .routing-pages-vs-app-img {
    width: 700px;
    height: auto;
  }
</style>

# Routing

## With pages router

The app router always has priority over the page router

Routes :

```
/
/admin
/admin/employees
```

##--##

src directory :

<img src="./assets/images/02-routing/app-vs-pages-priority.png" class="routing-pages-vs-app-img"  />

Notes:

Il est possible de faire cohabiter app et pages router

Dans le cadre d'une migration par exemple

Ou dans des cas plus spécifiques si vraiment une feature est indisponible avec l'un ou l'autre

Le app router prendra toujours le pas sur le pages router (petit indice qui prouve la préférence de Vercel sur le app router)
