from flask import Flask, request, url_for
app = Flask(__name__)


@app.route('/')
def index():
    return '<h1>Hello World!</h1>'


@app.route('/projects/')
def projects():
    return 'the project page'


@app.route('/about')
def about():
    return 'The about page'


@app.route('/user/<name>')
def user(name):
    return '<h1>Hello, %s!</h1>' % name


@app.route('/post/<int:post_id>')
def post(post_id):
    return '<p>This is post %s</p>' % post_id

# post请求


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return 'do login'
    else:
        return 'show you login form'

if __name__ == '__main__':
    app.run(debug=True)
	

url_for('static', filename='style.css')
