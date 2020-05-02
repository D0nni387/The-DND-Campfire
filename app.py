import os
from flask import Flask, render_template, redirect, request, url_for, jsonify, session
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length
from werkzeug.security import generate_password_hash, check_password_hash



APP = Flask(__name__)
APP.config['SECRET_KEY'] = 'Thisisasecretshhh'
APP.config['MONGO_URI'] = 'mongodb+srv://d0nni3:Deadman87@campfire-sppig.azure.mongodb.net/Campfire?retryWrites=true&w=majority'
BOOTSTRAP = Bootstrap(APP)
MONGO = PyMongo(APP)


class LoginForm(FlaskForm):
    username = StringField('username', validators=[InputRequired(), Length(min=4, max=20)])
    password = PasswordField('password', validators=[InputRequired(), Length(min=6, max=80)])
    remember = BooleanField('remember me')

class RegisterForm(FlaskForm):
    email = StringField('email', validators=[InputRequired(), Email(message='Invalid Email Address'), Length(max=40)])
    username = StringField('username', validators=[InputRequired(), Length(min=4, max=20)])
    password = PasswordField('password', validators=[InputRequired(), Length(min=6, max=80)])

@APP.route('/')
def get_intro():
    """
    Returns index page
    """
    return render_template("pages/index.html")


@APP.route('/character/create')
def create_character():

    """
    Returns Create Page
    """

    return render_template("pages/create.html")


@APP.route('/character/insert_character', methods=['POST'])
def insert_character():

    """
    Passes new character form data to JSON
    """
    characters = MONGO.db.character
    new_character = {
        'name':request.form.get('name'),
        'class':request.form.get('class'),
        'hit_die':request.form.get('hit_die'),
        'saving_throw1':request.form.get('saving_throw1'),
        'saving_throw2':request.form.get('saving_throw2'),
        'proficiency1':request.form.get('proficiency1'),
        'proficiency2':request.form.get('proficiency2'),
        'start_equipment_choice':request.form.get('start_equipment_choice'),
        'start_equip1':request.form.get('start_equip1'),
        'start_equip2':request.form.get('start_equip2')
    }
    characters.insert_one(new_character)
    return redirect(url_for('get_party'))

@APP.route('/party')
def get_party():
    """
    Returns Party Page
    """
    return render_template("pages/party.html")


@APP.route('/account')
def my_account():
    """
    Returns Account Page
    """
    return render_template("pages/account.html")

@APP.route('/login', methods=['GET', 'POST'])
def login():
    """
    Returns Login Page
    """
    form = LoginForm()

    if form.validate_on_submit():    
        return '<h1>' + form.username.data + ' ' + form.password.data + '</h1>'

    return render_template("pages/login.html", form=form)

@APP.route('/register', methods=['GET', 'POST'])
def register():
    """
    Returns Register Page
    """
    form = RegisterForm()
    user = MONGO.db.users
    if form.validate_on_submit():
        user_doc = {'username': request.form.get('username'),
                    'password': request.form.get('password'),
                    'email': request.form.get('email')}
        user.insert_one(user_doc)

        return redirect(url_for('get_party'))
    return render_template("pages/register.html", form=form)


if __name__ == '__main__':
    APP.run(host=os.environ.get('IP'), port=os.environ.get('PORT'),debug=True)
