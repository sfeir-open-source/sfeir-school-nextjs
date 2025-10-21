<!-- .slide: class="two-column with-code title-margin-sm" -->

<style>
  .tree-33{
    width: 500px;
    height: auto;
  }
</style>

# Composition

**What if I import a server-component from a client-component ?**

<img src="./assets/images/03-server-components/tree-1.png" class="tree-33" />

##--##

<div>
<br/> <br/><br/>
"use client" is declared at module-level <br/> All imports are considered to be client-components.

<img src="./assets/images/03-server-components/tree-2.png" class="tree-33" />
</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Un composant sans "use client" importé dans un client component devient automatiquement un client-component

Ce qui signifie qu'il peut être re-render si il y'a un changement de props

Et donc, premier point de vigilance à avoir : il ne faut pas que ce composant fasse des choses impossibles à faire côté client

Comme faire du rendu asynchrone, charger de la donnée ou utiliser les API Node.js
