FROM node:22-alpine AS frontend
WORKDIR /build
COPY client/package.json client/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY client/ .
RUN pnpm build

FROM dunglas/frankenphp:latest

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy backend
COPY server/ ./server/
RUN cd /app/server && composer install --no-interaction --no-scripts --no-autoloader \
    && composer dump-autoload --optimize --no-interaction

# Copy built frontend into the web root
COPY --from=frontend /build/dist ./public
COPY docker/php.ini $PHP_INI_DIR/conf.d/opcache.ini

RUN install-php-extensions pdo_pgsql redis

# Create non-root user with writable dirs
RUN adduser --disabled-password --gecos "" -u 1000 ilya \
    && mkdir -p /data /config/caddy \
    && chown -R ilya:ilya /data /config /app

USER ilya
