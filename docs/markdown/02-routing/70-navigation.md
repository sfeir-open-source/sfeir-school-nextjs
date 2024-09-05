<!-- .slide: class="two-column with-code " -->

# Navigating

## How does it works ?

- Code splitting
- Prefetching
- Router cache
- Client-side navigation - Soft navigation
- Partial rendering
- Scroll restoration

Notes:

Une fois les pages créées, on va chercher à naviguer entre elles

Chaque route / layout génère ses propres fichiers dans le build

Ce qui permet le code splitting

Donc à la navigation côté client :

- On peut prefetcher les routes (charger les ressources à l'avance)
- On peut persister les ressources dans le cache
- On peut faire de la navigation dans refresh
- Partial rendering, on en a parlé avec les layouts
- Scoll restoration : Possibilités plus riches qu'avec un refresh classique

Démo des fonctionnalités sur l'appli
