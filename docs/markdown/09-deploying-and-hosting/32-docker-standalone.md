<!-- .slide: class="two-column with-code " -->

# Deploying

## Docker

you can optimize even further using nextjs standalone mode :

```js
// next.config.js
module.exports = {
  output: 'standalone',
};
```

##--##

<br/> <br/>
Adaptations on dockerfile :

```dockerfile [30-36, 42,45]
## Depdencies stage
FROM node:20-alpine AS base

FROM base AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci

## Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# This directory will be used for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```
