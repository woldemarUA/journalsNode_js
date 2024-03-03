# Utilize an official PHP image as the parent image
FROM php:8.2-apache

# Enable Apache modules
RUN a2enmod rewrite headers

# Install system dependencies for the intl extension
RUN apt-get update && apt-get install -y \
        libicu-dev \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql intl

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
EXPOSE 80
