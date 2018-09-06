import os
from flask import Flask, request, url_for, render_template, make_response, redirect, session, escape
# 版本兼容问题？
# from flask.ext.sqlalchemy import SQLAlchemy 或 from flaskext.sqlalchemy import SQLAlchemy 均报错
from flask_sqlalchemy import SQLAlchemy

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True

db = SQLAlchemy(app)
# 定义Role和User模型
class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    users = db.relationship('User', backref='role')
    def __repr__(self): 
        return '<Role %r>' % self.name
    
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    def __repr__(self):
        return '<User %r>' % self.username
    

app.secret_key = '\xe6\xeb~\xfb\x81\x05\x83h\xfbEK\xb6s\xef\x16\x17\xd1Q\xf8\xddG\x9a\xa2\x81'

@app.route('/')
def index():
    if 'username' in session:
        return 'Logged in as %s <br> <a href="/logout">Log out</a>' % escape(session['username'])
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

@app.route('/testAJAX', methods=['POST'])
def testAJAX():
    if request.method == 'POST':
        return 'You got it!'
        

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page404.html'), 404


if __name__ == '__main__':
    app.run(debug=True)

