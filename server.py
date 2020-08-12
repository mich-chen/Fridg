"""Server for recipes based on fridge ingredients app."""


# importing all these for now
from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
import os
import requests
import json

# import jinja 2 to make it throw errors for undefined variables
from jinja2 import StrictUndefined


# instance of Flask class, store as app
app = Flask(__name__)

app.secret_key = "secretkey"
app.jinja_env.undefined = StrictUndefined\

# secret key from api
API_KEY = os.environ["SPOONACULAR_KEY"]



@app.route('/')
def homepage():
    """Show homepage."""

    return render_template("homepage.html")



@app.route('/login', methods=["POST"])
def process_login():

    email = request.form.get('email')
    password = request.form.get('password')
    # print(request.is_json)
    # login_data = request.get_json()
    # print(login_data.email, login_data.password)
    # print(email, password)


    # session['user_id'] = login_data.email
    flash('logged in!')

    # flash('hit login route!')

    # function to check if email exists in db
    # existing_user = User.query.filter_by(email=email).first()

    # if existing_user and password == existing_user.password:
    #     flash('Successfully logged in!')
    # elif existing_user:
    #     flash('You cannot create an account with that email. Try again.')
    # else:
    #     # create a new user in db
    #     flash('Account created successfully!')


    return jsonify({"success": True})

@app.route('/logout')
def process_logout():

    del session['user_id']
    flash('logged out!')
    return redirect('/')


@app.route('/search_results', methods=["POST"])
def search_results():

    # User's input is a string of comma-separated list of ingredients 
    input_ingredients_str = request.form.get("user_ingredients")

    # spoonacular's api url
    url = "https://api.spoonacular.com/recipes/complexSearch"
    # api parameters
    payload = {"apiKey": API_KEY, 
               "includeIngredients": input_ingredients_str,
               "addRecipeInformation": True,
               "sort": "max-used-ingredients",
               "instructionsRequired": True,
               "fillIngredients": True,
               "ignorePantry": True,
               # "offset": 5,
               "number": 3,
               } 
    # make http request to spoonacular's complexSearch API
    res = requests.get(url, params=payload)
    # convert json into python dictionary -> API is a List of dictionaries
    data = res.json()
    # print(res.json())

    recipes = data['results']

    # for recipe in recipes:
    #     instructions = recipe['analyzedInstructions'][0]['steps']
    #     # instructions is list of dictionaries which are each step
    #     print(f'number of steps: {len(instructions)}')
    #     for step in instructions:
    #         print(step['step'])
    #     print('\n')

    return render_template("search_results.html", recipes=recipes)


@app.route('/saved_recipes')
def add_recipe_to_saved():

    pass




if __name__ == "__main__":
    # run app with debug mode on and on host computer
    app.run(debug=True, host="0.0.0.0")