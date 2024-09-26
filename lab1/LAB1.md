# LAB1

# Step 1

## install apache

```shell
sudo apt install apache2
```

![image-20240708111825590](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708111825590.png)

```shell
sudo ufw app list
```

![image-20240708112117730](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708112117730.png)

```shell
sudo ufw app list
sudo ufw allow in "Apache"
sudo ufw status
```

![image-20240708112640463](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708112640463.png)

```````
192.168.56.101
```````



![image-20240708112735135](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708112735135.png)

## install MYSQL

```shell
sudo apt install mysql-server
```

![image-20240708113029187](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708113029187.png)

````shell
sudo mysql_secure_installation
````

![image-20240708113306152](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708113306152.png)

```shell
sudo mysql
```

![image-20240708113344778](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708113344778.png)

## install PHP

```shell
sudo apt install php libapache2-mod-php php-mysql
php -v
```

![image-20240708113526891](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708113526891.png)

## Creating a Virtual Host for your Website

```shell
sudo mkdir /var/www/jiraphat_testing
sudo chown -R $USER:$USER /var/www/jiraphat_testing
sudo nano /etc/apache2/sites-available/jiraphat_testing.conf
```

```shell
<VirtualHost *:80>
    ServerName jiraphat_testing
    ServerAlias www.jiraphat_testing
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/jiraphat_testing
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

![image-20240708114422490](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708114422490.png)

```sheel
sudo a2ensite jiraphat_testing
sudo a2dissite 000-default
sudo apache2ctl configtest
sudo systemctl reload apache2
```

![image-20240708114613153](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708114613153.png)

```shell
nano /var/www/jiraphat_testing/index.html
```

```html
<html>
  <head>
    <title>Jiraphat Testing website</title>
  </head>
  <body>
    <h1>Hello World! :)</h1>

    <p>This is the landing page of <strong>your_domain</strong>.</p>
  </body>
</html>
```

```url
http://192.168.56.101
```

![image-20240708114759785](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708114759785.png)

## Testing PHP Processing on your Web Server

```shell
nano /var/www/jiraphat_testing/info.php
```

```php
<?php
phpinfo();
```

![image-20240708114932761](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708114932761.png)

# Step 2

## Testing Database Connection from PHP (Optional)

```shell
sudo mysql
```

```mysql
CREATE DATABASE jiraphat_example_database;
CREATE USER 'jiraphat'@'%' IDENTIFIED BY '12345678';
```

![image-20240708115207480](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708115207480.png)

```mysql
GRANT ALL ON jiraphat_example_database.* TO 'jiraphat'@'%';
```

![image-20240708115524962](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708115524962.png)

```shell
mysql -u jiraphat -p
```

```mysql
SHOW DATABASES;
```

![image-20240708115652919](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708115652919.png)

```mysql
CREATE TABLE jiraphat_example_database.todo_list (
  item_id INT AUTO_INCREMENT,
  content VARCHAR(255),
  PRIMARY KEY(item_id)
);

INSERT INTO jiraphat_example_database.todo_list (content) VALUES ("My first important item");

SELECT * FROM jiraphat_example_database.todo_list;
```

![image-20240708115829073](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708115829073.png)

```shell
nano /var/www/jiraphat_testing/todo_list.php
```

```shell
<?php
$user = "jiraphat";
$password = "12345678";
$database = "jiraphat_example_database";
$table = "todo_list";

try {
  $db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
  echo "<h2>TODO</h2><ol>";
  foreach($db->query("SELECT content FROM $table") as $row) {
    echo "<li>" . $row['content'] . "</li>";
  }
  echo "</ol>";
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
```

```shell
http://192.168.56.101/todo_list.php
```

![image-20240708120127372](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708120127372.png)

# Step 3

## install git

```shell
sudo apt install git
git --version
```

![image-20240708121847607](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708121847607.png)

```shell
git config --global user.name "Jiraphat-DEV"
git config --global user.email "aum.aumtp@gmail.com"
git config --list
```

![image-20240708122106445](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708122106445.png)

## Step 4

## install mysql workbench

![image-20240708122451829](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708122451829.png)

![image-20240708122536649](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708122536649.png)



![image-20240708123217812](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708123217812.png)

## Step 5

![image-20240708123431336](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708123431336.png)

![image-20240708124317106](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708124317106.png)

## Step 6

```shell
sudo mkdir -p /var/www/jiraphat_1/public_html
sudo mkdir -p /var/www/jiraphat_2/public_html

sudo chown -R $USER:$USER /var/www/jiraphat_1/public_html
sudo chown -R $USER:$USER /var/www/jiraphat_2/public_html

sudo chmod -R 755 /var/www
```

![image-20240708124624587](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708124624587.png)

```shell
nano /var/www/jiraphat_1/public_html/index.html
```

```html
<html>
  <head>
    <title>Welcome to jiraphat 1!</title>
  </head>
  <body>
    <h1>Success! The jiraphat 1 virtual host is working!</h1>
  </body>
</html>
```

```shell
nano /var/www/jiraphat_2/public_html/index.html
```

```html
<html>
  <head>
    <title>Welcome to jiraphat 2!</title>
  </head>
  <body>
    <h1>Success! The jiraphat 2 virtual host is working!</h1>
  </body>
</html>
```

![image-20240708124906069](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708124906069.png)

```shell
sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/jiraphat_1.conf
sudo nano /etc/apache2/sites-available/jiraphat_1.conf
```

edit

```sh
<VirtualHost *:80>
  ...
    ServerAdmin admin@jiraphat_1
    ServerName jiraphat_1
    ServerAlias www.jiraphat_1
    DocumentRoot /var/www/jiraphat_1/public_html
    ...
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    ...
</VirtualHost>
```

copy config file to jiraphat_2

```sh
sudo cp /etc/apache2/sites-available/jiraphat_1.conf /etc/apache2/sites-available/jiraphat_2.conf
sudo nano /etc/apache2/sites-available/jiraphat_2.conf
```

edit

```sh
<VirtualHost *:80>
  ...
    ServerAdmin admin@jiraphat_2
    ServerName jiraphat_2
    ServerAlias www.jiraphat_2
    DocumentRoot /var/www/jiraphat_2/public_html
    ...
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    ...
</VirtualHost>
```

![image-20240708125624702](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708125624702.png)

```sh
sudo a2ensite jiraphat_1.conf
sudo a2ensite jiraphat_2.conf
sudo a2dissite 000-default.conf
sudo apache2ctl configtest
sudo systemctl restart apache2
sudo systemctl status apache2
```

![image-20240708125907763](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708125907763.png)

```sh
http://www.jiraphat1.net/
http://www.jiraphat2.net/
```

![image-20240708135711225](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708135711225.png)

on windows (host)

![image-20240708135745179](C:\Users\jiraphat_ja64\AppData\Roaming\Typora\typora-user-images\image-20240708135745179.png)

## Step 7

```shell
cd /Users/jiraphat/Desktop/ProjectHub/SD/lab1
npm install -g create-react-app
```

