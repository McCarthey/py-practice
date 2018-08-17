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

- 安装flask
虚拟环境中执行
```shell
pip install flask
```

- 初始化
所有Flask程序都必须创建一个程序实例，
```python
from flask import Flask
app = Flask(__name__)
```
Flask类构造函数只有一个必须指定的参数，即程序主模块或包的名字

- 路由和视图函数
客户端将请求发送给web服务器，web服务器再将请求发送给Flask程序实例。
使用程序提供的app.route修饰器来定义路由，把修饰的函数注册为路由。
```python
@app.route('/')
def index():
	return '<h1>Hello World!</h1>'
```
此处index()函数为程序跟地址的处理程序
