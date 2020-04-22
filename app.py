import os
from flask import Flask, render_template, redirect, request, url_for, jsonify
import pymongo
from bson.objectid import ObjectId

APP = Flask(__name__)


@APP.route('/')
def get_intro():
    """
    Returns index page
    """
    return render_template("pages/index.html")


@APP.route('/create')
def create_character():
    return render_template("pages/create.html")


@APP.route('/insert_character', methods=['POST'])
def insert_character():
    return jsonify({'name':request.form.get('name'),
                    'class':request.form.get('class_list'), 
                    'hit_die':request.form.get('hit_die'),
                    'saving_throw1':request.form.get('saving_throw1'),
                    'saving_throw2':request.form.get('saving_throw2'),
                    'proficiency1':request.form.get('proficiency1'),
                    'proficiency2':request.form.get('proficiency2')})


@APP.route('/party')
def get_party():
    return render_template("pages/party.html")


@APP.route('/account')
def my_account():
    return render_template("pages/account.html")


if __name__ == '__main__':
    APP.run(host=os.environ.get('IP'), port=os.environ.get('PORT'),debug=True)
