import os
from flask import Flask, render_template, redirect, request, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

app = Flask(__name__)

@app.route('/')
def get_intro():   
    return render_template("components/index.html")

@app.route('/create')
def create_character():
    return render_template("pages/create.html")

@app.route('/insert_character', methods=['POST'])
def insert_character():
    return redirect(url_for('get_party'))

@app.route('/party')
def get_party():
    return render_template("pages/party.html")

@app.route('/account')
def my_account():
    return render_template("pages/account.html")

if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            debug=True)