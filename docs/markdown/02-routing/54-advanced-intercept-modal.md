<!-- .slide: class="two-column with-code " -->

<style>
  .intercepting-pattern-modal-img {
    width: 400px;
    height: auto;
  }

  .intercepting-pattern-modal-schema-img {
    width: 700px;
    height: auto;
  }
  </style>

# Routing

## Intercepting routes + Parallel routing

We can combine route interception and parallel routing to display a page on top of the content of the current page :

<img src="./assets/images/02-routing/modal-routes.png" class="intercepting-pattern-modal-img" />

##--##

<img src="./assets/images/02-routing/modal-schema.png" class="intercepting-pattern-modal-schema-img" />

Notes:

L'interception toute seule peut sembler trop spécifique, mais utilisé en combinaison avec le parallel routing, elle permet de gérer des modals avec URL

Démo sur l'application SFEIR People
