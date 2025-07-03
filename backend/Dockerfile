# Usa imagem base oficial do PHP com FPM
FROM php:8.2-fpm

# Instala extensões necessárias
RUN apt-get update && apt-get install -y \
    git unzip zip curl libpq-dev libzip-dev libpng-dev libjpeg-dev libfreetype6-dev libicu-dev libonig-dev mariadb-client \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install intl pdo pdo_mysql zip gd opcache \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define o diretório de trabalho
WORKDIR /var/www/html

# Copia os arquivos do projeto
COPY . .

# Garante permissões corretas para diretórios do Symfony
RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data var \
    && chmod -R 775 var

# Expõe a porta padrão do PHP-FPM
EXPOSE 9000

# Comando padrão do container
CMD ["php-fpm"]
