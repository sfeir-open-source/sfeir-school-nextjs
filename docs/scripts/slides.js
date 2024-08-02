import { SfeirThemeInitializer } from '../web_modules/sfeir-school-theme/sfeir-school-theme.mjs';

// One method per module
function schoolSlides() {
  return [
    '00-school/00-title.md',
    '00-school/00-planning.md',
    '00-school/00-wifi.md',
    '00-school/00-repo.md',
    '00-school/00-requirements.md',
    '00-school/00-speaker.md',
    '00-school/00-tour-de-table.md',
  ];
}

function introSlides() {
  return ['01-intro/01-title.md'];
}

function routingSlides() {
  return [
    '02-routing/02-title.md',
    '02-routing/02-intro.md',
    '02-routing/02-naming.md',
    '02-routing/02-hierarchy.md',
    '02-routing/02-nesting.md',
    '02-routing/02-with-pages-router.md',
    '02-routing/02-colocation.md',
    '02-routing/02-colocation-private.md',
    '02-routing/02-pages.md',
    '02-routing/02-pages-dynamic.md',
    '02-routing/02-layout.md',
    '02-routing/02-nested-layout.md',
    '02-routing/02-template.md',
    '02-routing/02-advanced.md',
  ];
}

function formation() {
  return [
    //
    ...schoolSlides(), //
    ...introSlides(), //
    ...routingSlides(), //
  ].map((slidePath) => {
    return { path: slidePath };
  });
}

SfeirThemeInitializer.init(formation);
