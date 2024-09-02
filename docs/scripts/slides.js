import { SfeirThemeInitializer } from '../web_modules/sfeir-school-theme/sfeir-school-theme.mjs';

function schoolSlides() {
  return [
    '00-school/01-title.md',
    '00-school/10-planning.md',
    '00-school/20-wifi.md',
    '00-school/21-repo.md',
    '00-school/22-requirements.md',
    '00-school/30-speaker.md',
    '00-school/31-tour-de-table.md',
    '00-school/40-what-we-will-do.md',
    '00-school/41-plan.md',
    '00-school/42-application.md',
    '00-school/43-commands.md',
  ];
}

function introSlides() {
  return [
    '01-intro/01-title.md',
    '01-intro/02-bg.md',
    '01-intro/10-what.md',
    '01-intro/11-what-meta.md',
    '01-intro/12-react-vercel.md',
    '01-intro/13-equivalents.md',
    '01-intro/14-features.md',
    '01-intro/20-history.md',
    '01-intro/21-app-router.md',
    '01-intro/22-today.md',
    '01-intro/30-command.md',
  ];
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
    '04-data-fetching/42-memoization-example.md',
    '04-data-fetching/43-memoisation-third.md',
    '04-data-fetching/44-data.md',
    '04-data-fetching/45-data-ttl.md',
    '04-data-fetching/46-data-ttl-behavior.md',
    '04-data-fetching/47-data-on-demand.md',
    '04-data-fetching/48-data-third.md',
    '04-data-fetching/50-route-cache.md',
    '04-data-fetching/51-route-cache-configuration.md',
    '04-data-fetching/60-router-browser-cache.md',
    '04-data-fetching/61-router-browser-cache-configuration.md',
    '04-data-fetching/70-recap.md',
    '04-data-fetching/80-lab.md',
  ];
}

function mutationSlides() {
  return [
    '05-mutations/00-title.md',
    '05-mutations/01-intro.md',
    '05-mutations/02-behavior-without.md',
    '05-mutations/03-behavior-with.md',
    '05-mutations/04-behavior.md',
    '05-mutations/10-conventions-definition.md',
    '05-mutations/11-conventions-using.md',
    '05-mutations/12-conventions-prop.md',
    '05-mutations/13-other-than-form.md',
    '05-mutations/14-params.md',
    '05-mutations/15-params-invocation.md',
    '05-mutations/16-security.md',
    '05-mutations/17-security-closure.md',
    '05-mutations/18-security-origins.md',
    '05-mutations/19-how-to-chose.md',
    '05-mutations/20-lab.md',
    '05-mutations/30-useformstatus.md',
    '05-mutations/31-useformstate.md',
    '05-mutations/32-error.md',
    '05-mutations/40-lab.md',
  ];
}

function errorSlides() {
  return [
    '06-error-management/00-title.md',
    '06-error-management/01-intro.md',
    '06-error-management/10-error-boundaries.md',
    '06-error-management/11-router-default.md',
    '06-error-management/12-router-error.md',
    '06-error-management/13-parallel-routing.md',
    '06-error-management/14-custom.md',
    '06-error-management/20-lab.md',
    '06-error-management/30-expected-errors.md',
    '06-error-management/31-expected-redirect.md',
    '06-error-management/32-not-found.md',
    '06-error-management/40-lab.md',
  ];
}

function middlewareSlides() {
  return [
    '07-middleware/00-title.md',
    '07-middleware/01-intro.md',
    '07-middleware/10-next-config.md',
    '07-middleware/11-headers.md',
    '07-middleware/12-matching.md',
    '07-middleware/13-matching-attribute.md',
    '07-middleware/14-redirects.md',
    '07-middleware/15-rewrite.md',
    '07-middleware/16-rewrite-advanced.md',
    '07-middleware/20-lab.md',
    '07-middleware/30-middleware.md',
    '07-middleware/31-definition.md',
    '07-middleware/32-use-cases.md',
    '07-middleware/33-convention.md',
    '07-middleware/34-url-matching.md',
    '07-middleware/35-api-modify.md',
    '07-middleware/36-api-rewrite-redirect.md',
    '07-middleware/37-api-return.md',
    '07-middleware/38-warning.md',
    '07-middleware/40-lab.md',
  ];
}

function renderingMethodSlides() {
  return [
    '08-rendering-methods/00-title.md',
    '08-rendering-methods/01-intro.md',
    '08-rendering-methods/10-ssr.md',
    '08-rendering-methods/11-pro-cons.md',
    '08-rendering-methods/20-static-rendering.md',
    '08-rendering-methods/21-static-rendering-schema.md',
    '08-rendering-methods/22-static-rendering-config.md',
    '08-rendering-methods/30-incremental.md',
    '08-rendering-methods/31-incremental-schema.md',
    '08-rendering-methods/32-incremental-example.md',
    '08-rendering-methods/33-incremental-example2.md',
    '08-rendering-methods/34-incremental-runtime.md',
    '08-rendering-methods/40-lab.md',
    '08-rendering-methods/50-streaming.md',
    '08-rendering-methods/51-solution.md',
    '08-rendering-methods/52-streaming-next.md',
    '08-rendering-methods/53-streaming-loading.md',
    '08-rendering-methods/54-streaming-parallel.md',
    '08-rendering-methods/60-suspense.md',
    '08-rendering-methods/61-limitations.md',
    '08-rendering-methods/70-lab.md',
  ];
}

function deployingSlides() {
  return [
    '09-deploying-and-hosting/00-title.md',
    '09-deploying-and-hosting/01-intro.md',
    '09-deploying-and-hosting/10-vercel.md',
    '09-deploying-and-hosting/20-nodejs.md',
    '09-deploying-and-hosting/30-docker-image.md',
    '09-deploying-and-hosting/31-docker-multistage.md',
    '09-deploying-and-hosting/32-docker-standalone.md',
    '09-deploying-and-hosting/33-docker-demo.md',
    '09-deploying-and-hosting/34-docker-cache.md',
    '09-deploying-and-hosting/35-docker-cache-custom.md',
    '09-deploying-and-hosting/36-docker-cache-redis.md',
    '09-deploying-and-hosting/40-static.md',
    '09-deploying-and-hosting/41-static-convention.md',
    '09-deploying-and-hosting/42-static-supported.md',
    '09-deploying-and-hosting/43-static-unsupported.md',
    '09-deploying-and-hosting/44-static-adaptations.md',
    '09-deploying-and-hosting/45-static-proxy-schema.md',
    '09-deploying-and-hosting/46-static-pro-cons.md',
  ];
}

function formation() {
  return [
    ...schoolSlides(),
    ...introSlides(),
    ...routingSlides(),
    ...serverComponentSlides(),
    ...dataFetchingSlides(),
    ...mutationSlides(),
    ...errorSlides(),
    ...middlewareSlides(),
    ...renderingMethodSlides(),
    ...deployingSlides(),
  ].map((slidePath) => {
    return { path: slidePath };
  });
}

SfeirThemeInitializer.init(formation);
