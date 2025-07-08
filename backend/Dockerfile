FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    nginx git unzip zip curl libpq-dev libzip-dev libpng-dev libjpeg-dev libfreetype6-dev libicu-dev libonig-dev mariadb-client \
 && docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-install intl pdo pdo_mysql zip gd opcache \
 && apt-get clean && rm -rf /var/lib/apt/lists/* \
 && ln -s /usr/local/bin/php /usr/bin/php

RUN sed -i 's|^listen = .*|listen = 9000|' /usr/local/etc/php-fpm.d/www.conf \
 && echo "memory_limit=512M" > /usr/local/etc/php/conf.d/memory-limit.ini

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

ARG APP_ENV=prod
ENV APP_ENV=${APP_ENV}

COPY . ./

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p var/cache var/log \
 && chown -R www-data:www-data var \
 && chmod -R 775 var

EXPOSE 80

CMD ["sh", "-c", "nginx -g 'daemon off;' & php-fpm -F"]
