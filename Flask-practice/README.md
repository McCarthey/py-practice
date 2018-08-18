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
此处index()函数为程序跟地址的处理程序，被称为视图函数

Flask支持URL中存在可变部分，
```python
@app.route('/user/<name>')
def user(name):
	return '<h1>Hello, %s!</h1>' %name
```

- 启动服务器
```python
if __name__ == '__main__':
	app.run(debug=True)
```
debut=True可以实现应用的热更新
```
__name__=='__main__'确保直接执行这个脚本时才启动开发服务器
```

- 程序和请求上下文
Flask使用上下文临时把某些对象变为全局可访问。例如：
```python
from flask import request

@app.route('/')
def index():
	user_agent = request.headers.get('User-Agent')
	return '<p>Your browser is %s</p>' % user_agent
```
此处的 request 在一个线程中全局可访问

