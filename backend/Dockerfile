FROM php:8.2-fpm

# Instala dependências do sistema e extensões PHP
RUN apt-get update && apt-get install -y \
    git unzip zip curl libpq-dev libzip-dev libpng-dev libjpeg-dev libfreetype6-dev libicu-dev libonig-dev mariadb-client nginx supervisor \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install intl pdo pdo_mysql zip gd opcache

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define diretório de trabalho
WORKDIR /var/www/html

# Copia configuração do Nginx
COPY ./docker/nginx/symfony.conf /etc/nginx/sites-available/default

# Configura supervisord para rodar nginx e php-fpm
COPY ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Cria o diretório var e aplica permissões
RUN mkdir -p /var/www/html/var \
    && chown -R www-data:www-data /var/www/html/var \
    && chmod -R 775 /var/www/html/var

# Expõe as portas do php-fpm e nginx
EXPOSE 9000 80

# Comando padrão ao iniciar o container
CMD ["/usr/bin/supervisord", "-n"]
