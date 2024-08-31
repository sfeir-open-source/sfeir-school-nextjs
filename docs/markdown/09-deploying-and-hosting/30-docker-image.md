<!-- .slide: class="two-column with-code " -->

# Deploying

## Docker

Basic dockerfile :

```dockerfile
FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm run build

COPY /app/package*.json ./
COPY /app/next.config.js ./
COPY /app/node_modules ./node_modules
COPY /app/.next ./.next
COPY /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
```
