# ===== deps =====
FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ===== build =====
FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 👇 Truyền key ở build-time qua ARG, không hardcode
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bG95YWwtY29sdC03OC5jbGVyay5hY2NvdW50cy5kZXYk

RUN npm run build

# ===== run =====
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
