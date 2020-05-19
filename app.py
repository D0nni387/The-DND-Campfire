import os
from flask import Flask, render_template, redirect, request, url_for, session
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

APP = Flask(__name__)

APP.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
APP.config['MONGO_URI'] = os.environ.get('MONGO_URI')
MONGO = PyMongo(APP)

@APP.route('/')
def get_intro():
    """
    Returns index page
    """
    return render_template("pages/index.html")

@APP.route('/character/create', methods=['GET', 'POST'])
def create_character():
    """
    Returns Create Page and sends creation form to database when posted.
    """
    if request.method == 'POST':
        characters = MONGO.db.character
        new_character = {
            'userID' : session['username'],
            'gender' :request.form.get('gender'),
            'name':request.form.get('name'),
            'class':request.form.get('class_list'),
            'hit_die':request.form.get('hit_die'),
            'saving_throw1':request.form.get('saving_throw1'),
            'saving_throw2':request.form.get('saving_throw2'),
            'proficiency1':request.form.get('proficiency1'),
            'proficiency2':request.form.get('proficiency2'),
            'start_equipment_choice':request.form.get('start_equipment_choice'),
            'start_equip1':request.form.get('start_equip1'),
            'start_equip2':request.form.get('start_equip2'),
            'story':request.form.get('story')
            }
        characters.insert_one(new_character)
        return redirect(url_for('get_party'))

    return render_template("pages/create.html")

@APP.route('/account')
def my_account():
    """
    Returns Account Page
    """
    users = MONGO.db.users
    current_user = users.find_one({'name': session['username']})
    return render_template("pages/account.html", user=current_user)

@APP.route('/logout')
def logout():
    """Logs out the user and pops session"""
    session.pop('username')
    return render_template("pages/index.html")

@APP.route('/party')
def get_party():
    """
    Returns Party Page
    """
    characters = MONGO.db.character
    party_char = characters.find({'userID': session['username']})
    party_list = [characters for characters in party_char]
    return render_template("pages/party.html", party=party_list)

@APP.route('/character/edit/<character_id>')
def edit_character(character_id):
    """
    Takes character_id from party page and redirects to edit page for specified character
    """
    this_character = MONGO.db.character.find_one({"_id": ObjectId(character_id)})

    return render_template("pages/edit.html", character=this_character)

@APP.route('/character/update/<character_id>', methods=['POST'])
def update_character(character_id):
    """
    Passed submitted edit for and ammends database for character_id
    """
    characters = MONGO.db.character
    characters.update({'_id':ObjectId(character_id)}, {
        'userID' : session['username'],
        'gender' :request.form.get('gender'),
        'name':request.form.get('name'),
        'class':request.form.get('class_list'),
        'hit_die':request.form.get('hit_die'),
        'saving_throw1':request.form.get('saving_throw1'),
        'saving_throw2':request.form.get('saving_throw2'),
        'proficiency1':request.form.get('proficiency1'),
        'proficiency2':request.form.get('proficiency2'),
        'start_equipment_choice':request.form.get('start_equipment_choice'),
        'start_equip1':request.form.get('start_equip1'),
        'start_equip2':request.form.get('start_equip2'),
        'story':request.form.get('story')})
    return redirect(url_for('get_party'))

@APP.route('/character/delete/<character_id>')
def delete_character(character_id):
    """
    Takes character_id from party page and removes the selected character from database
    """
    MONGO.db.character.remove({"_id": ObjectId(character_id)})
    return redirect(url_for('get_party'))

@APP.route('/login', methods=['GET', 'POST'])
def login():
    """
    Returns Login Page and allows user to log in via form,
    checks in the database to ensure username and password match
    """
    user = MONGO.db.users
    login_user = user.find_one({'name' : request.form.get('username')})
    if login_user:
        if check_password_hash(login_user['password'], request.form['password']):
            session['username'] = request.form['username']
            return redirect(url_for('get_intro'))
        return 'invalid username/password'
    return render_template("pages/login.html")

@APP.route('/register', methods=['GET', 'POST'])
def register():
    """
    Returns Register Page, allows the user to create a new account,
    checks if the username is already taken to prevent duplication
    """
    if request.method == 'POST':
        user = MONGO.db.users
        active_user = user.find_one({'name' : request.form.get('username')})
        password = generate_password_hash(request.form['password'], "sha256")
        if active_user is None:
            user.insert({'name' : request.form['username'],
                         'password' : password,
                         'email' : request.form['email']})
            session['username'] = request.form['username']
            return redirect(url_for('get_party'))

        return 'That username exists'

    return render_template("pages/register.html")

@APP.errorhandler(404)
def page_not_found(e):
    return render_template('pages/404.html'), 404

if __name__ == '__main__':
    APP.run(host=os.environ.get('IP'), port=os.environ.get('PORT'), debug=os.environ.get('DEBUG'))
