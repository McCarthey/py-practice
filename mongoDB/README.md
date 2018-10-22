# mongoDB相关
- 启动mongoDB：进入mongoDB\bin目录，执行mongod.exe --dbpath [dataBasePath]
- 连接mongoDB：进入mongoDB\bin目录，执行mongo.exe 启动mongo shell

- mongo Shell
	```javascript
	db /*显示你正在使用的db*/
	show dbs /*列出全部的db*/
	use <database> /*切换到指定的db*/
	db.myCollection.insertOne( { x: 1 } ) /*在集合myCollection中插入数据*/
	db.getCollection('myCollection').find() /*列出myCollection中的数据*/
	```
- MongoDB在集合(collections)中存储BSON文档(BSON documents);集合(collections)存储在数据库(databases)中。在类似的数据中，集合相当于表。