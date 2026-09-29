# ==============================================================================
# Stage 1: Build Production Dependencies
# ==============================================================================
FROM node:20-alpine AS backend-builder

WORKDIR /app

COPY src/backend/package*.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY src/backend/ ./

# ==============================================================================
# Stage 2: Hardened Runtime Container (Least Privilege)
# ==============================================================================
FROM node:20-alpine

# Security Metadata
LABEL maintainer="fewd-project"
LABEL version="2.0.0"
LABEL description="FEWD Project - Hardened Full-Stack Backend Service"
LABEL security.hardened="true"

WORKDIR /app

# Copy production artifacts with unprivileged ownership
COPY --from=backend-builder --chown=node:node /app ./

# Switch to non-root system user
USER node

EXPOSE 3000

# Automated healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3000) + '/', (r) => { process.exit(r.statusCode < 500 ? 0 : 1); })" || exit 1

CMD ["node", "server.js"]