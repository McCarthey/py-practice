from flask import Flask, request, url_for, render_template, make_response, redirect, session, escape
app = Flask(__name__)

app.secret_key = '\xe6\xeb~\xfb\x81\x05\x83h\xfbEK\xb6s\xef\x16\x17\xd1Q\xf8\xddG\x9a\xa2\x81'

@app.route('/')
def index():
    if 'username' in session:
        return 'Logged in as %s' % escape(session['username'])
    return 'You are not logged in <a href="/login">Click here to log in</a>'


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
            session['username'] = request.form['username']
            return redirect(url_for('index'))
        else:
            error = 'Invalid username or password'
            return error
    return render_template('login.html', error=error)


def valid_login(user, pwd):
    if user == 'admin' and pwd == 'admin':
        return True


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))


@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['the_file']
        print(f.filename)
        f.save('./uploads/uploaded_file.txt')
        return 'file saved'


@app.errorhandler(404)
def page_not_found(error):
    return render_template('page404.html'), 404


if __name__ == '__main__':
    app.run(debug=True)


url_for('static', filename='style.css')
