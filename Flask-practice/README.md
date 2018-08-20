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

请注意URL的重定向行为
```python
@app.route('/projects/')
def projects():
    return 'The project page'

@app.route('/about')
def about():
    return 'The about page'
```
访问http://127.0.0.1:5000/projects 或者 http://127.0.0.1:5000/projects/都会路由到project页，前者会被flask重定向到末尾带斜杠的路由；但是访问http://127.0.0.1:5000/about/会报404，只能访问http://127.0.0.1:5000/about


- HTTP方法
默认情况下，路由只回应GET请求，但可以通过route()装饰器传递methods参数可以改变这个行为

- 构造URL
Flask不仅能匹配url，还可以用url_for生成url 


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

- 静态文件
你的包中或是模块的所在目录中创建一个名为 static 的文件夹，在应用中使用 /static 即可访问，通过url_for模块生成路由

- 模板渲染
使用render_template()方法渲染模板。Flask 会在 templates 文件夹里寻找模板。
Flask采用[Jinja2模板](http://docs.jinkan.org/docs/jinja2/)。如果name包含HTML，自动转义功能默认开启。

- 使用form表单
使用form表单实现登录验证功能
注意input的name属性即是表单提交时的键值

- 数据库模式
```sql
drop table if exists entries;
create table entries(
	id integer primary key autoincrement,
	title string not null,
	text string not null
)
```
这个模式包含一个名为 entries 的表，该表中的每行都包含一个 id 、一个 title 和一个 text 。 id 是一个自增的整数，也是主键；其余的两个是字符串，且不允许为空。