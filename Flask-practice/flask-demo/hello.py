from flask import Flask
app = Flask(__name__)


@app.route('/')
def index():
    return '<h1>Hello World!</h1>'


@app.route('/user/<name>')
def user(name):
    return '<h1>Hello, %s!</h1>' % name

@app.route('/post/<int:post_id>')
def post(post_id):
	return '<p>This is post %s</p>' %post_id


if __name__ == '__main__':
    app.run(debug=True)
