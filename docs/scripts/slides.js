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
  ];
}

function serverComponentSlides() {
  return [
    '03-server-components/00-title.md',
    '03-server-components/01-intro.md',
    '03-server-components/10-csr.md',
    '03-server-components/11-csr-workflow.md',
    '03-server-components/13-ssr.md',
    '03-server-components/14-ssr2.md',
    '03-server-components/15-ssr3.md',
    '03-server-components/16-ssr-next.md',
    '03-server-components/17-ssr-workflow.md',
    '03-server-components/18-hydration-cons.md',
    '03-server-components/20-server-components.md',
    '03-server-components/21-heavy-work.md',
    '03-server-components/22-security.md',
    '03-server-components/23-node-api.md',
    '03-server-components/24-client-server.md',
    '03-server-components/25-lab.md',
    '03-server-components/31-rules-hooks.md',
    '03-server-components/32-rules-import.md',
    '03-server-components/33-boundaries.md',
    '03-server-components/34-boundaries-invalid.md',
    '03-server-components/35-composition.md',
    '03-server-components/36-composition1.md',
    '03-server-components/37-composition2.md',
    '03-server-components/38-recap.md',
    '03-server-components/40-lab.md',
  ];
}

function formation() {
  return [
    //
    ...schoolSlides(), //
    ...introSlides(), //
    ...routingSlides(), //
    ...serverComponentSlides(), //
  ].map((slidePath) => {
    return { path: slidePath };
  });
}

SfeirThemeInitializer.init(formation);
