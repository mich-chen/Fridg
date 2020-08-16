"""Server for recipes based on fridge ingredients app."""

# importing flask library
from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
# from flask_debugtoolbar import DebugToolbarExtension

import os # to access api key
import requests # make http requests to api
import json
from pprint import pprint

# import jinja 2 to make it throw errors for undefined variables
from jinja2 import StrictUndefined

from model import connect_to_db
import crud # operations for db
import helper_functions


# instance of Flask class, store as app
app = Flask(__name__)

app.secret_key = "secretkey"
app.jinja_env.undefined = StrictUnde fined\

# secret key from api
API_KEY = os.environ["SPOONACULAR_KEY"]


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    """Catch all URL routes that don't match specific path."""

    return render_template('root.html')


@app.route('/')
def homepage():
    """Show homepage."""

    return render_template("root.html")


@app.route('/api/login', methods=["POST"])
def process_login():

    print('in login route')
    # unencode from JSON
    data = request.get_json()
    # # print(data)
    email = data['email']
    password = data['password']

    # function to check if email exists in db
    existing_user = crud.get_user_by_email(email=email)

    message = ''
    success = True

    # check if email exists in db, if so also check correct password
    if existing_user and password == existing_user.password:
        # create session for user
        session['email'] = email
        # set new message
        message = 'Valid user. Successfully logged in.'

    # if password does not match, and email already exists in db
    elif existing_user:
        # set new message
        message = 'Incorrect email or password. If new user, you cannot create an account with that email. Try again.'
        # change success status
        success = False

    # new user, add new user to db 
    else:
        new_user = crud.create_user(email=email, password=password)
        # create session for user
        session['email'] = email
        # set new message
        message = 'Successfully created new account!'

    return jsonify({'success': success, 'message': message})



@app.route('/logout')
def process_logout():
    """Remove user's session after logout."""

    del session['email']
    del session['recipes']
    flash('logged out!')
    return redirect('/')



@app.route('/api/search_results', methods=["POST"])
def search_results():
    """Make API request for search results."""

    print("route is hit through js")
    # unencode from JSON
    data = request.get_json()
    # User's input is a string of comma-separated list of ingredients 
    input_ingredients_str = data['ingredients']
    print(input_ingredients_str)
    # print(request.form)

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

    # list of recipes (which are dictionaries about recipe details)
    recipes_complex_data = data['results']
    # print(type(recipes_complex_data))
    # pprint(recipes_complex_data)

    recipe_results = []

    # parse only details we need from api endpoint
    for recipe in recipes_complex_data:
        recipe_data = {}
        recipe_data['recipe_info'] = helper_functions.parse_recipe_details(recipe)
        recipe_data['recipe_times'] = helper_functions.parse_recipe_times(recipe)
        recipe_data['recipe_instructions'] = helper_functions.parse_recipe_instructions(recipe)
        recipe_data['recipe_equipment'] = helper_functions.parse_recipe_equipment(recipe)
        recipe_results.append(recipe_data)
    # pprint(recipe_results)

    # store recipe results in current user's session
    session['recipe_results'] = recipe_results
    session['full_complex_results'] = recipes_complex_data
    # pprint(session['recipe_results'])

    # return render_template("search_results.html", recipes=recipes)
    return jsonify(recipe_results)

# @app.route('/api/show_results')
# def show_search_results():
#     """Show recipe search results."""

#     reipces = 












@app.route('/api/save_a_recipe',methods=["POST"])
def add_recipe_to_saved():
    """Add selected recipe to database as saved recipe.

    User clicked the "save recipe" button on each recipe card, therefore should only be saving one recipe at a time (one recipe_id passed in POST request body)."""
    print('in save_a_recipe route')
    # unencode from JSON
    data = request.get_json()

    # selected recipe's id
    recipe_id = data['recipe_id']
    pprint(recipe_id)

    # retrieve session's email (if stored account info)
    if session['email']:
        user = crud.get_user_by_email(session['email'])
    # adds user's selected recipe to saved recipes table, is_favorite is false until favorited after saving recipe
    crud.save_a_recipe(user=user.user_id, recipe=recipe_id, is_favorite=False)
    
    # search's list of organized recipe dictionaries 
    search_results = session['recipe_results']

    # recipe_info is saved recipe's details (1 recipe)
    recipe_info = {}
    # loop through search's results, find the recipe that matches saved recipe's id
    for recipe in search_results:
        if recipe_id == recipe['recipe_info']['recipe_id']:
            pprint('found recipe matched id')
            recipe_info = recipe

    title = recipe_info['recipe_info']['title']
    image = recipe_info['recipe_info']['image']
    servings = recipe_info['recipe_info']['servings']
    cooking_mins = recipe_info['recipe_times']['cookingMinutes']
    prep_mins = recipe_info['recipe_times']['preparationMinutes']
    ready_mins = recipe_info['recipe_times']['readyInMinutes']
    # add recipe's title, image, and servings to recipes table in db
    crud.create_recipe(recipe_id=recipe_id, title=title, image=image, servings=servings, cooking_mins=cooking_mins, prep_mins=prep_mins, ready_mins=ready_mins)

    # complex_ingredients is a list of dictionaries of each ingredient's details
    complex_ingredients = recipe_info['recipe_info']['ingredients']
    for ingredient in complex_ingredients:
        ingredient_id = ingredient['ingredient_id']
        amount = ingredient['amount']
        unit = ingredient['unit']
        crud.add_recipe_ingredient(recipe=recipe_id, ingredient_id=ingredient_id, amount=amount, unit=unit)

    # ordered list of recipe's instructions (no numbers)
    instructions_list = recipe_info['recipe_instructions']['instructions']
    # enumerate through list of ordered instructions
    for i, instruction in enumerate(instructions_list):
        # set step_num by adding 1 to indices
        step_num = i + 1
        step_instruction = instruction
        pprint(step_num, step_instruction)
        # add recipe's instruction step and instructions, one by one to db
        crud.add_instructions(recipe=recipe_id, step_num=step_num, step_instruction=step_instruction)

    # dictionary with equipment name as both key and value
    for equipment in recipe_info['recipe_equipment']:
        pprint(equipment)
        crud.add_equipment(recipe=recipe_id, equipment=equipment)

    saved_recipe = Saved_Recipe.query.all()
    pprint(saved_recipe)
    
    return jsonify({'message': 'Recipe saved!'})




@app.route('/show_saved_recipes')
def show_users_saved_recipes():
    """Show all of user's saved recipes."""

    # all_saved_recipes = crud.show_saved_recipes()

    # recipe_ids = []

    # for recipe in all_saved_recipes:
    #     recipe_ids[recipe.recipe_id] = 

    pass


@app.route('/favorited')
def favorite_a_recipe():
    """Actively favorite a recipe.

    set is_favorite in db to True."""

    pass





if __name__ == '__main__':
    # Connect to db first, then app can access it.
    app.debug = True
    connect_to_db(app)
    # DebugToolbarExtension(app)
    app.run(host='0.0.0.0')
