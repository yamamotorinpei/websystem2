# websystem基礎実験 MySQL編

## Paiza Cloudの起動

```新規サーバ作成```時に```Node.js```と```MySQL```をクリック（タップ）で選択しておいてください．

## MySQLの初期設定

### mysqlコマンド

ユーザを作成するために，まずは管理者権限でログインする．コマンド名はそのものズバリ```mysql```である．

```bash
~$ sudo mysql
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 4
Server version: 5.7.24-0ubuntu0.18.04.1 (Ubuntu)

Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

### ユーザ作成とパスワード設定

ユーザ```node```を作成する．ユーザ名は各自変更して構わないが，後々のサンプルプログラムとの整合性を考えて，ひとまずnodeのまま作成すること．

```
mysql> create user 'node'@'localhost' identified with mysql_native_password by 'pw';
Query OK, 0 rows affected (0.00 sec)

mysql>
```

続いて，```node```のパスワードを設定する．ここでは```websystem```というパスワードにする．

```bash
mysql> set password for 'node'@'localhost' = password('websystem');
Query OK, 0 rows affected, 1 warning (0.01 sec)

mysql>
```

### データベース作成と権限の付与

データベース```web```を作成する．例によってデータベース名は各自変更して構わないが，後々のサンプルプログラムとの整合性を考えて，ひとまずwebのまま作成すること．

```bash
mysql> create database web;
Query OK, 1 row affected (0.00 sec)

mysql>
```

続いて，データベース```web```にアクセスする権限を，先ほど作成したユーザ```node```に付与する．

```bash
mysql> grant all on web.* to node@localhost;
Query OK, 0 rows affected (0.00 sec)

mysql>
```

### ユーザやデータベースの確認

一応，きちんと作成できているか確認しよう．（と言っても，ユーザがきちんと作成されていなければ途中でエラーが発生する）

ユーザがきちんと作成されていれば，以下のように表示される．
```
mysql> show grants for 'node'@'localhost';
+------------------------------------------+
| Grants for node@localhost                |
+------------------------------------------+
| GRANT USAGE ON *.* TO 'node'@'localhost' |
+------------------------------------------+
1 row in set (0.00 sec)

mysql>
```

データベースを一覧した例を示す．上から4つはシステムが使用するデータベースであり，その下に先ほど作成した```web```が存在している．

```bash
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| web                |
+--------------------+
5 rows in set (0.01 sec)

mysql>
```

ここまでできていれば，初期設定は完了である．mysqlコマンドを終わらせるには，```exit```コマンドを使用する．

```bash
mysql> exit
Bye
~$
```

### ここまでの設定を簡単に済ますために

毎回上記の設定を行うのはタイヘンなので，ここまでの作業をバックアップしたファイルを用意した．次回からは，そのファイルをリストアすれば良い．やり方は以下のとおりです．

```bash
~$ git clone https://github.com/sudahiroshi/websystem2.git
Cloning into 'websystem2'...
remote: Enumerating objects: 6, done.
remote: Counting objects: 100% (6/6), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 6 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (6/6), done.
~$ cd websystem2
~/websystem2$ sudo mysql < init.sql
~/websystem2$
```







