<!-- .slide: class="two-column with-code" -->

<style>
  .routing-naming {
    width: 500px;
    height: auto;
  }
</style>

# Routing

## Conventions

(.tsx | .ts | .js | .jsx)

<img src="./assets/images/02-routing/naming.png" class="routing-naming"  />

##--##

<br/> <br/> <br/>

<div>

⚠️ **Warning :** <br/> It's not possible to create routes other than with the file-system based router

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Next.js a un router basé sur le filesystem

Les pages et les points d'entrée de l'application sont définis par des fichiers :

- nommés d'une certaine manière
- placés au bon endroit

Le dossier principal est configurable à l'init d'un projet :

- Soit la racine du projet
- Soit le dossier /app

Listing des différents fichiers

Pour les erreurs / loading -> on verra ça dans des modules dédiés
