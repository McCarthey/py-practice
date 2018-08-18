from flask import Flask, request, url_for, render_template
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
def user(name=None):
    return render_template('user.html', name=name)


@app.route('/post/<int:post_id>')
def post(post_id):
    return '<p>This is post %s</p>' % post_id

# post请求


@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        print(request.form)
        if valid_login(request.form['username'], request.form['password']):
            return 'login success'
        else:
            error = 'Invalid username or password'
            return error
    return render_template('login.html', error=error)


def valid_login(user, pwd):
    if user == 'admin' and pwd == 'admin':
        return True


if __name__ == '__main__':
    app.run(debug=True)


url_for('static', filename='style.css')
