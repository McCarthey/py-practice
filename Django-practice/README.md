- 创建python虚拟环境：
新建项目目录，执行
```
python -m venv [env_name]
```
我们以环境名为learning_env为例
成功后需要激活虚拟环境：
windows:
```
learning_env\Scripts\activate
```
Linux:
```
source learning_env/bin/activate
```

- 安装Django
```
pip install Django
```
- 在Django中创建项目
```
django-admin.py startproject learning_log .
```
即 让Django新建一个名为learning_log的项目。命令末尾的句点让新项目使用合适的目录结构，这样开发完成后可轻松地将应用程序部署到服务器 。
- 创建数据库
```
python manage.py migrate
```
我们将修改数据库成为**迁移**数据库。首次执行命令migrate时，将让Django确保数据库与项目的当前状态匹配。该命令同时指出它将创建必要的数据库表。
- 查看项目
```
python manage.py runserver
```
如果项目已经被正确地创建，那么执行该命令后，将会生成一个本地链接（Django欢迎页面）。如果端口已被占用， 则执行
```
python manage.py runserver 8001
```
切换其他端口
- 创建应用程序
在learning_log同级目录下执行startapp命令
```
python manage.py startapp learning_logs
```
命令startapp [appname] 让Django建立创建应用程序所需的基础设施

- 创建超级用户
```
python manage.py createsuperuser
```
