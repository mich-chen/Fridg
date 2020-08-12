"""Server for recipes based on fridge ingredients app."""


# importing all these for now
from flask import (Flask, render_template, request, flash, session, redirect)
import os
import requests
import json

# import jinja 2 to make it throw errors for undefined variables
from jinja2 import StrictUndefined

from pprint import pprint

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

    session['user_id'] = email
    flash('logged in!')

    # flash('hit login route!')

    # function to check if email exists in db

    # conditional if email exists, flash message
    # else create a new user in db and flash message
    return redirect("/")



@app.route('/search_results', methods=["POST"])
def search_results():

    # User's input is a string of comma-separated list of ingredients 
    input_ingredients_str = request.form.get("user_ingredients")
    
    # print(input_ingredients_str)

    url = "https://api.spoonacular.com/recipes/complexSearch"
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
    res = requests.get(url, params=payload)
    # convert json into python dictionary -> API is a List of dictionaries
    data = res.json()
    # print(res.json())

    recipes = data['results']

    # each list is a list of dictionaries of each step with keys:
    # 'number', 'step', 'ingredients', 'equipment'
    # instruction_steps = []


    # for recipe in recipes:
    #     instructions = recipe['analyzedInstructions'][0]['steps']
    #     # instructions is list of dictionaries which are each step
    #     # instruction_steps.append(instructions)
    #     print(f'number of steps: {len(instructions)}')
    #     for step in instructions:
    #         print(step['step'])
    #     print('\n')


    return render_template("search_results.html", recipes=recipes)






if __name__ == "__main__":
    # run app with debug mode on and on host computer
    app.run(debug=True, host="0.0.0.0")