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



## テーブルの作成

mySQLはデータベースの中でも，リレーショナルデータベースと呼ばれる種類に属する．これは，複数のテーブルから構成されるデータを連結（リレーション）して使用するタイプのデータベースである．よって，使用する際には，テーブルの作成が必要となる．まずは，簡単なテーブルを作成してみよう．

まず，先ほど作成したユーザ```node```でmysqlにログインする．

```bash
~/websystem2$ mysql -u node -pwebsystem web
mysql: [Warning] Using a password on the command line interface can be insecure.
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 6
Server version: 5.7.24-0ubuntu0.18.04.1 (Ubuntu)

Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

続いて，```create```コマンドを使用してテーブルを作成する．ここでは，名前が入力できるシンプルなテーブルを作成する．ここでは，テーブル名がnamesで，nameというvarchar（可変文字数の文字列）のみを持つテーブルを作る例である．

```bash
mysql> create table names ( name varchar(100) );
Query OK, 0 rows affected (0.07 sec)

mysql>
```

テーブルが作られていることを確認するには，```describe```コマンドを使用する．

```bash
mysql> describe names;
+-------+--------------+------+-----+---------+-------+
| Field | Type         | Null | Key | Default | Extra |
+-------+--------------+------+-----+---------+-------+
| name  | varchar(100) | YES  |     | NULL    |       |
+-------+--------------+------+-----+---------+-------+
1 row in set (0.00 sec)

mysql>
```

## データの挿入

続いて，```insert```コマンドを使用してテーブルにデータを挿入する．ここでは，テーブル名namesの，列nameに，値ルフィを挿入している．

```bash
mysql> insert into names (name) values ('ルフィ');
Query OK, 1 row affected (0.01 sec)

mysql>
```

## データの取り出し

続いて，```select```コマンドを使用してデータを取り出してみる．```*```は，すべての列から取り出すことを意味し，fromの後ろでテーブル名を指定している．

```bash
mysql> select * from names;
+-----------+
| name      |
+-----------+
| ルフィ    |
+-----------+
1 row in set (0.00 sec)

mysql>
```

## データの上書き

リレーショナルデータベースは，




## データを集める

環境が整ったので，実際にデータを入れてデータベースとして使用してみる．本来は複数のテーブルから構成されるデータ群を連結（リレーション）するのだが，まずは1枚のテーブルのみを扱う．

なお，ここで使用するデータは政府の統計データを掲載しているサイト [e-Stat](https://www.e-stat.go.jp/) からダウンロードした．今回は演習授業用に，都道府県別の人口統計と大学のデータを別々にダウンロードして結合したものを使用する．ただし，年度がずれているのでその点だけご了承ください．






