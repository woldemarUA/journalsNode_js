FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libzip-dev \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql intl zip

# Enable Apache modules
RUN a2enmod rewrite headers

# Download and install Composer globally
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && php -r "unlink('composer-setup.php');"
# Define working directory to /var/www/html
WORKDIR /var/www/html

# Create Apache virtual host file to properly handle Symfony routes
RUN echo '<VirtualHost *:80>\n\
    DocumentRoot /var/www/html/public\n\
    <Directory /var/www/html/public>\n\
        AllowOverride All\n\
        Order Allow,Deny\n\
        Allow from All\n\
    </Directory>\n\
    FallbackResource /index.php\n\
</VirtualHost>' > /etc/apache2/sites-available/000-default.conf


RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
# Make the entrypoint script executable




# Set the default command to run Apache in the foreground
CMD ["apache2-foreground"]

# Expose port 80
EXPOSE 8080
