import { SfeirThemeInitializer } from '../web_modules/sfeir-school-theme/sfeir-school-theme.mjs';

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
    '02-routing/70-navigation.md',
    '02-routing/71-link.md',
    '02-routing/72-userouter.md',
    '02-routing/73-history.md',
    '02-routing/74-redirect.md',
    '02-routing/75-hooks.md',
    '02-routing/76-serverside.md',
    '02-routing/80-lab.md',
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

function dataFetchingSlides() {
  return [
    '04-data-fetching/00-title.md',
    '04-data-fetching/01-intro.md',
    '04-data-fetching/10-server-fetch.md',
    '04-data-fetching/11-server-third.md',
    '04-data-fetching/12-server-parallel-pattern.md',
    '04-data-fetching/13-server-parallel.md',
    '04-data-fetching/14-server-security.md',
    '04-data-fetching/20-client-handler.md',
    '04-data-fetching/21-client-handler-convention.md',
    '04-data-fetching/22-client-handler-request.md',
    '04-data-fetching/23-client-handler-headers.md',
    '04-data-fetching/24-client-fetch.md',
    '04-data-fetching/30-lab.md',
    '04-data-fetching/40-caching.md',
    '04-data-fetching/41-memoization.md',
    '04-data-fetching/42-memoisation-third.md',
    '04-data-fetching/43-data.md',
    '04-data-fetching/43-data-ttl.md',
    '04-data-fetching/45-data-route.md',
    '04-data-fetching/46-data-tag.md',
    '04-data-fetching/46-data-third.md',
    '04-data-fetching/50-route-cache.md',
    '04-data-fetching/60-recap.md',
    '04-data-fetching/70-lab.md',
  ];
}

function formation() {
  return [
    ...schoolSlides(),
    ...introSlides(),
    ...routingSlides(),
    ...serverComponentSlides(),
    ...dataFetchingSlides(),
  ].map((slidePath) => {
    return { path: slidePath };
  });
}

SfeirThemeInitializer.init(formation);
