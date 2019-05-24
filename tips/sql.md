## SQL基本操作
mysql -uXXX -pXXXXXX
使用mysql -u表示用户 -p表示密码
### select
查看user表
```sql
select * from user;
```

### delete
删除id=XXX的行
```sql
delete from user where id=XXX;
```
删除多个
```sql
delete from user where id in (XX, XXX, XXXX);
```

删除多行,id在XX和XXX之间，包括XX和XXX都会被删除
```sql
delete from user where id between XX and XXX;
```

删除多行
```sql
delete from user where id > XXX;
```