192.168.2.2

user : pi

pass : raspberry



mysql

user : jiraphat_user

pass : raspberry



samba

user : pi

pass : raspberry



```
CREATE DATABASE jiraphat_database;

CREATE USER 'jiraphat_user'@'%' IDENTIFIED BY 'raspberry';

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'raspberry';

GRANT ALL ON jiraphat_database.* TO 'jiraphat_user'@'%';
```

```shell
mysql -u jiraphat_user -p

password : raspberry
```

```mysql
CREATE TABLE jiraphat_database.todo_list (
  item_id INT AUTO_INCREMENT,
  content VARCHAR(255),
  PRIMARY KEY(item_id)
);

INSERT INTO jiraphat_database.todo_list (content) VALUES ("My first important item");

SELECT * FROM jiraphat_database.todo_list;
```

```shell
vim /var/www/jiraphat/todo_list.php
```

```php
<?php
$user = "jiraphat_user";
$password = "raspberry";
$database = "jiraphat_database";
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

