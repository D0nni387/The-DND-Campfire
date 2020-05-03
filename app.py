import os
from flask import Flask, render_template, redirect, request, url_for, jsonify, session
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash



APP = Flask(__name__)

""" To Debug Server Issue """
APP.config['SECRET_KEY'] = 'Thisisasecretshhh'
APP.config['MONGO_URI'] = 'mongodb+srv://d0nni3:Deadman87@campfire-sppig.azure.mongodb.net/Campfire?retryWrites=true&w=majority'
MONGO = PyMongo(APP)

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

@APP.route('/login', methods=['POST'])
def login():
    """
    Returns Login Page
    """
    

    if 'username' in session:
        return 'Welcome back' + session['username']


    return render_template("pages/login.html")

@APP.route('/register', methods=['GET', 'POST'])
def register():
    """
    Returns Register Page
    """
    
    if request.method == 'POST':
        user = MONGO.db.users
        active_user = user.find_one({'name' : request.form.get('username')})

        if active_user is None:
            hashpass = generate_password_hash(request.form.get('password'), 'sha256')
            user.insert({'name' : request.form.get('username'), 'password' : hashpass, 'email' : request.form.get('email')})
            session['username'] = request.form.get('username')
            return redirect(url_for('get_intro'))

        return 'That username exists'

    return render_template("pages/register.html")


if __name__ == '__main__':
    APP.run(host=os.environ.get('IP'), port=os.environ.get('PORT'),debug=True)
