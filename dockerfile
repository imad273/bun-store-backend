FROM oven/bun:1 AS base
COPY . .
RUN bun install
CMD ["bun", "api/index.ts"]