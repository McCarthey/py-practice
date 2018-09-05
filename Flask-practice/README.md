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

- SQL优缺点

使用 SQLite 的便利性在于不需要单独配置一个数据库服务器，并且 Python 提供了 内置支持。但是当并发请求同时要写入时，会比较慢一点，因为每个写操作是按顺序 进行的。小应用没有问题，但是大应用可能就需要考虑换成别的数据库了。

- 创建数据库连接

当使用 SQLite 数据库（包括其他多数数据库的 Python 库）时，第一件事就是创建 一个数据库的连接。所有查询和操作都要通过该连接来执行，完事后该连接关闭。

- 蓝图blueprint

Blueprint 是一种组织一组相关视图及其他代码的方式。与把视图及其他 代码直接注册到应用的方式不同，蓝图方式是把它们注册到蓝图，然后在工厂函数中把蓝图注册到应用。

- SQL数据库相关

数据库中的主键是表中各行的唯一标识符。表中还可以有称为外键的列，引用同一个表或不同表中某行的主键。行之间的这种联系称为关系，这是关系型数据库模型的基础。

抽象层，也称为对象关系映射（Object-Relational Mapper, ORM）或对象文档映射（Object-Document Mapper, ODM）。ORM和ODM把对象业务转换成数据库业务会有一定损耗。

**模型：** 这个术语表示程序使用的持久化实体。在ORM中，模型一般是一个python类，类中的属性对应数据库表中的列。例如：
```python
class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    def __repr__(self):
        return '<Role %r>' % self.name
```
其中，类变量__tablename__定义在数据库中使用的表名。如果没有定义__tablename__，Flask-SQLAlchemy会使用一个默认名字，但默认的表名没有遵守使用复数形式进行命名的约定，所以最好由我们自己来指定表名。其余的类变量都是该模型的属性，被定义为db.Column类的实例

db.Column类构造函数的第一个参数是数据库列和模型属性的类型。


类型名 | python类型  | 说明
------------- | ------------- | -------------
Integer | int | 普通整数，一般是32位
SmallInteger | int | 小的整数，一般是16位
BigInteger | int 或 long | 不限制精度的整数
Float | float | 浮点数
Numeric | decimal.Decimal | 定点数
String | str | 变长字符串
Text | str | 变长字符串，对较长或不限长度的字符串做了优化
Unicode | unicode | 变长Unicode字符串
UnicodeText | unicode | 变长Unicode字符串，对较长或不限长度的字符串做了优化
Boolean | bool | 布尔值
Date | datetime.date | 日期
Time | datetime.time | 时间
DateTime | datetime.datetime | 日期和时间
Interval | datetime.timedelta | 时间间隔
Enum | str | 一组字符串
PickleType | 任何Python对象 | 自动使用Pickle序列化
LargeBinary | str | 二进制文件




