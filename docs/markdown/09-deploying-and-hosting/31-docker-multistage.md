<!-- .slide: class="two-column with-code " -->

# Deploying

## Docker

optimize final image size with multi-stage build:

```dockerfile
FROM node:20-alpine AS base

## Depdencies stage
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

COPY --chown=nextjs:nodejs package*.json ./
COPY --chown=nextjs:nodejs next.config.js ./
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
```
