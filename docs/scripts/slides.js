import { SfeirThemeInitializer } from '../web_modules/sfeir-school-theme/dist/sfeir-school-theme.mjs';

function schoolSlides() {
  return [
    '00-school/01-title.md',
    '00-school/12.1-speaker-nicolas.md',
    '00-school/13-tour-de-table.md',
    '00-school/20-planning.md',
    '00-school/30-requirements.md',
    '00-school/31-wifi.md',
    '00-school/32-repo.md',
    '00-school/40-what-we-will-do.md',
    '00-school/41-plan.md',
    '00-school/42-application.md',
    '00-school/43-commands.md',
  ];
}

function introSlides() {
  return [
    '01-intro/00-title.md',
    '01-intro/10-problem.md',
    '01-intro/11-metaframework.md',
    '01-intro/12-vercel-react.md',
    '01-intro/20-app-router.md',
    '01-intro/30-whats-ahead.md',
    '01-intro/40-history.md',
    '01-intro/50-create-next-app.md',
    '01-intro/51-cli-flags.md',
    '01-intro/60-project-structure.md',
    '01-intro/80-lets-go.md',
    '01-intro/90-lab.md',
  ];
}

function layoutSlides() {
  return [
    '02-layout/00-title.md',
    '02-layout/10-page.md',
    '02-layout/11-page-schema.md',
    '02-layout/20-layout-problem.md',
    '02-layout/21-layout-solution.md',
    '02-layout/22-layout-persist.md',
    '02-layout/30-root-layout.md',
    '02-layout/40-nested-layouts.md',
    '02-layout/50-route-groups.md',
    '02-layout/60-image-problem.md',
    '02-layout/61-next-image.md',
    '02-layout/62-next-image-depth.md',
    '02-layout/70-metadata.md',
    '02-layout/71-metadata-depth.md',
    '02-layout/80-lets-go.md',
    '02-layout/90-lab.md',
  ];
}

function navigationSlides() {
  return [
    '03-navigation/00-title.md',
    '03-navigation/10-problem.md',
    '03-navigation/20-dynamic-segment.md',
    '03-navigation/30-params.md',
    '03-navigation/40-link-problem.md',
    '03-navigation/41-link-solution.md',
    '03-navigation/42-link-prefetch.md',
    '03-navigation/50-active-link.md',
    '03-navigation/80-lets-go.md',
    '03-navigation/90-lab.md',
  ];
}

function serverComponentsSlides() {
  return [
    '04-server-components/00-title.md',
    '04-server-components/10-reveal.md',
    '04-server-components/11-reveal-tree.md',
    '04-server-components/20-why-it-matters.md',
    '04-server-components/21-server-only-example.md',
    '04-server-components/30-cant-do.md',
    '04-server-components/40-use-client.md',
    '04-server-components/41-use-client-boundary.md',
    '04-server-components/50-composition-rule.md',
    '04-server-components/51-composition-leaves.md',
    '04-server-components/51.1-serializable-props.md',
    '04-server-components/60-decision-rule.md',
    '04-server-components/70-row-click-payoff.md',
    '04-server-components/70.1-router-methods.md',
    '04-server-components/71-active-link-payoff.md',
    '04-server-components/80-lets-go.md',
    '04-server-components/90-lab.md',
  ];
}

function compositionSlides() {
  return [
    '05-composition/00-title.md',
    '05-composition/10-puzzle.md',
    '05-composition/11-resolution.md',
    '05-composition/12-theme-example.md',
    '05-composition/13-context-providers-pattern.md',
    '05-composition/14-react-cache.md',
    '05-composition/20-composition-habit.md',
    '05-composition/30-expenses-payoff.md',
    '05-composition/40-log-read-example.md',
    '05-composition/80-lets-go.md',
    '05-composition/90-lab.md',
  ];
}

function dataFetchingSlides() {
  return [
    '06-data-fetching/00-title.md',
    '06-data-fetching/10-real-backend.md',
    '06-data-fetching/20-old-way.md',
    '06-data-fetching/30-fetch-in-component.md',
    '06-data-fetching/40-provider-pattern.md',
    '06-data-fetching/50-env-vars.md',
    '06-data-fetching/60-employee-expenses-problem.md',
    '06-data-fetching/70-route-handler.md',
    '06-data-fetching/71-route-handler-post.md',
    '06-data-fetching/72-route-handler-put-delete.md',
    '06-data-fetching/73-route-handler-vs-server-actions.md',
    '06-data-fetching/80-decision-rule.md',
    '06-data-fetching/90-lets-go.md',
    '06-data-fetching/95-lab.md',
  ];
}

function dataCachingSlides() {
  return [
    '07-data-caching/00-title.md',
    '07-data-caching/10-the-cost.md',
    '07-data-caching/20-mental-model.md',
    '07-data-caching/30-use-cache.md',
    '07-data-caching/40-flip-the-switch.md',
    '07-data-caching/50-cache-tag.md',
    '07-data-caching/60-revalidation-two-ways.md',
    '07-data-caching/65-cachelife-profiles.md',
    '07-data-caching/70-on-demand-revalidate.md',
    '07-data-caching/80-whos-calling-this.md',
    '07-data-caching/90-lets-go.md',
    '07-data-caching/95-lab.md',
  ];
}

function serverActionsSlides() {
  return [
    '08-server-actions/00-title.md',
    '08-server-actions/10-old-way.md',
    '08-server-actions/20-use-server.md',
    '08-server-actions/30-form-data.md',
    '08-server-actions/40-wire-it-up.md',
    '08-server-actions/50-function-vs-action.md',
    '08-server-actions/60-revalidate.md',
    '08-server-actions/70-redirect.md',
    '08-server-actions/72-throw-vs-return.md',
    '08-server-actions/73-bind-arguments.md',
    '08-server-actions/80-whats-next.md',
    '08-server-actions/90-lets-go.md',
    '08-server-actions/95-lab.md',
  ];
}

function formHooksSlides() {
  return [
    '09-form-hooks/00-title.md',
    '09-form-hooks/10-two-gaps.md',
    '09-form-hooks/20-use-action-state.md',
    '09-form-hooks/25-permalink.md',
    '09-form-hooks/30-action-returns-state.md',
    '09-form-hooks/40-form-reads-state.md',
    '09-form-hooks/45-client-validation.md',
    '09-form-hooks/50-use-form-status.md',
    '09-form-hooks/60-child-not-parent.md',
    '09-form-hooks/70-payoff.md',
    '09-form-hooks/80-whats-next.md',
    '09-form-hooks/90-lets-go.md',
    '09-form-hooks/95-lab.md',
  ];
}

function errorBoundariesSlides() {
  return [
    '10-error-boundaries/00-title.md',
    '10-error-boundaries/10-the-crash.md',
    '10-error-boundaries/20-default-screen.md',
    '10-error-boundaries/30-error-tsx.md',
    '10-error-boundaries/35-global-error.md',
    '10-error-boundaries/40-why-client.md',
    '10-error-boundaries/50-error-reset-props.md',
    '10-error-boundaries/60-nesting.md',
    '10-error-boundaries/70-parallel-routes.md',
    '10-error-boundaries/80-slot-errors.md',
    '10-error-boundaries/85-whats-next.md',
    '10-error-boundaries/90-lets-go.md',
    '10-error-boundaries/95-lab.md',
  ];
}

function expectedErrorsSlides() {
  return [
    '11-expected-errors/00-title.md',
    '11-expected-errors/10-not-a-crash.md',
    '11-expected-errors/20-the-gap.md',
    '11-expected-errors/30-notfound-function.md',
    '11-expected-errors/40-not-found-tsx.md',
    '11-expected-errors/45-route-handler-404.md',
    '11-expected-errors/50-nesting.md',
    '11-expected-errors/60-server-or-client.md',
    '11-expected-errors/70-decision-rule.md',
    '11-expected-errors/90-lets-go.md',
    '11-expected-errors/95-lab.md',
  ];
}

function lifecycleSlides() {
  return [
    '12-lifecycle/00-title.md',
    '12-lifecycle/05-the-full-picture.md',
    '12-lifecycle/10-the-question.md',
    '12-lifecycle/20-two-widgets-two-speeds.md',
    '12-lifecycle/30-without-anything.md',
    '12-lifecycle/40-suspense-the-answer.md',
    '12-lifecycle/50-two-boundaries.md',
    '12-lifecycle/60-streaming.md',
    '12-lifecycle/65-hydration.md',
    '12-lifecycle/70-shallow-on-purpose.md',
    '12-lifecycle/71-config-redirects.md',
    '12-lifecycle/73-config-rewrites.md',
    '12-lifecycle/75-cookie-rewrite.md',
    '12-lifecycle/90-lets-go.md',
    '12-lifecycle/95-lab.md',
  ];
}

function proxySlides() {
  return [
    '13-proxy/00-title.md',
    '13-proxy/10-the-hole.md',
    '13-proxy/20-proxy-file.md',
    '13-proxy/25-naming-history.md',
    '13-proxy/30-matcher.md',
    '13-proxy/40-reading-the-cookie.md',
    '13-proxy/50-two-redirects.md',
    '13-proxy/60-caution.md',
    '13-proxy/65-tying-it-together.md',
    '13-proxy/90-lets-go.md',
    '13-proxy/95-lab.md',
  ];
}

function renderingMethodsSlides() {
  return [
    '14-rendering-methods/00-title.md',
    '14-rendering-methods/10-the-question.md',
    '14-rendering-methods/20-the-spectrum.md',
    '14-rendering-methods/30-known-dynamic-routes.md',
    '14-rendering-methods/40-generate-static-params.md',
    '14-rendering-methods/50-subset-at-build.md',
    '14-rendering-methods/60-outside-the-set.md',
    '14-rendering-methods/65-dynamic-params-flag.md',
    '14-rendering-methods/70-vocabulary.md',
    '14-rendering-methods/90-lets-go.md',
    '14-rendering-methods/95-lab.md',
  ];
}

function suspenseSlides() {
  return [
    '15-suspense/00-title.md',
    '15-suspense/10-the-full-picture.md',
    '15-suspense/20-loading-file.md',
    '15-suspense/30-loading-scope.md',
    '15-suspense/40-the-slow-piece.md',
    '15-suspense/45-what-triggers-suspense.md',
    '15-suspense/50-nested-suspense.md',
    '15-suspense/60-decision-rule.md',
    '15-suspense/70-streaming-tie-in.md',
    '15-suspense/90-lets-go.md',
    '15-suspense/95-lab.md',
  ];
}

function deployingSlides() {
  return [
    '16-deploying-and-hosting/00-title.md',
    '16-deploying-and-hosting/10-the-gap.md',
    '16-deploying-and-hosting/20-vercel.md',
    '16-deploying-and-hosting/30-node-server.md',
    '16-deploying-and-hosting/40-docker.md',
    '16-deploying-and-hosting/50-static-export.md',
    '16-deploying-and-hosting/60-static-unsupported.md',
    '16-deploying-and-hosting/70-static-tradeoff.md',
    '16-deploying-and-hosting/80-compatibility.md',
    '16-deploying-and-hosting/90-you-made-it.md',
  ];
}

function conclusionSlides() {
  return [
    '20-conclusion/00-title.md', //
  ];
}

function formation() {
  return [
    ...schoolSlides(),
    ...introSlides(),
    ...layoutSlides(),
    ...navigationSlides(),
    ...serverComponentsSlides(),
    ...compositionSlides(),
    ...dataFetchingSlides(),
    ...dataCachingSlides(),
    ...serverActionsSlides(),
    ...formHooksSlides(),
    ...errorBoundariesSlides(),
    ...expectedErrorsSlides(),
    ...lifecycleSlides(),
    ...proxySlides(),
    ...renderingMethodsSlides(),
    ...suspenseSlides(),
    ...deployingSlides(),
    ...conclusionSlides(),
  ].map(slidePath => {
    return { path: slidePath };
  });
}

SfeirThemeInitializer.init(formation);
