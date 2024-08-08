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
    '02-routing/00-title.md',
    '02-routing/01-intro.md',
    '02-routing/10-naming.md',
    '02-routing/11-hierarchy.md',
    '02-routing/12-nesting.md',
    '02-routing/13-with-pages-router.md',
    '02-routing/20-colocation.md',
    '02-routing/21-colocation-private.md',
    '02-routing/30-pages.md',
    '02-routing/31-pages-dynamic.md',
    '02-routing/40-layout.md',
    '02-routing/41-root-layout.md',
    '02-routing/42-nested-layout.md',
    '02-routing/43-template.md',
    '02-routing/44-groups.md',
    '02-routing/50-advanced.md',
    '02-routing/51-advanced-parallel.md',
    '02-routing/52-advanced-intercept.md',
    '02-routing/53-advanced-intercept-patterns.md',
    '02-routing/54-advanced-intercept-modal.md',
    '02-routing/60-lab.md',
    '02-routing/61-lab2.md',
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
