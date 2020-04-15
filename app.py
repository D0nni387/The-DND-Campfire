import os
from flask import Flask, render_template, redirect, request, url_for
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
    return redirect(url_for('get_party'))


@APP.route('/party')
def get_party():
    return render_template("pages/party.html")


@APP.route('/account')
def my_account():
    return render_template("pages/account.html")


if __name__ == '__main__':
    APP.run(host=os.environ.get('IP'), port=os.environ.get('PORT'),
            debug=os.environ.get('DEBUG'))
