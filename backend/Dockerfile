# Dockerfile.dev

FROM php:8.2-fpm

# Instala dependências do sistema e extensões PHP necessárias
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev mariadb-client \
    && docker-php-ext-install pdo_mysql zip

# Define diretório de trabalho dentro do container
WORKDIR /var/www/html

# Copia todo o código da aplicação para dentro do container
COPY . .

# Instala dependências PHP via composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer install --no-interaction --prefer-dist

# Ajusta permissões para www-data se necessário
RUN chown -R www-data:www-data /var/www/html

# Expõe a porta do PHP-FPM
EXPOSE 9000

# Comando padrão para rodar o PHP-FPM
CMD ["php-fpm"]
