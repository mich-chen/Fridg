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

from model import connect_to_db, db
import crud # operations for db
import helper_functions


# instance of Flask class, store as app
app = Flask(__name__)

app.secret_key = "secretkey"
app.jinja_env.undefined = StrictUndefined

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



@app.route('/api/logout')
def process_logout():
    """Remove user's session after logout."""

    print('in logout route')

    session.pop('email', None)
    session.pop('recipes_results', None)

    return jsonify({'message': 'Logged out!'})
    # return redirect('/')



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

    return jsonify(recipe_results)

# @app.route('/api/show_results')
# def show_search_results():
#     """Show recipe search results."""

#     reipces = 

@app.route('/api/recipe_to_db', methods=["POST"])
def save_recipe_to_db():
    """Add selected recipe to recipes table in db."""

    pprint('in recipe_to_db route')
    # unencode from JSON
    data = request.get_json()
    # pprint(data)
    # information on selected recipe
    recipe_details = data['recipe_details']
    # pprint(recipe_details)
    # selected recipe's id
    recipe_id = recipe_details['recipe_info']['recipe_id']
    print(recipe_id)

    # must log in to save a recipe, if no session avail, prompt message
    if session.get('email') == None:
        print('in session == none')
        return jsonify({'success': False, 'message': 'You need to create an account to save a recipe!'})

    # find if recipe already exists in db, spoonacular's recipe id is db's recipe_id primary key
    if crud.find_recipe(recipe_id):
        print('recipe already in db')
        print(crud.find_recipe(recipe_id))
        return jsonify({'success': True, 'message': 'Recipe already in db, proceed to saving'})

    title = recipe_details['recipe_info']['title']
    image = recipe_details['recipe_info']['image']
    servings = recipe_details['recipe_info']['servings']
    sourceUrl = recipe_details['recipe_info']['sourceUrl']
    cooking_mins = recipe_details['recipe_times']['cookingMinutes']
    prep_mins = recipe_details['recipe_times']['preparationMinutes']
    ready_mins = recipe_details['recipe_times']['readyInMinutes']
    # add recipe's title, image, and servings to recipes table in db
    crud.create_recipe(recipe_id=recipe_id, title=title, image=image, servings=servings, sourceUrl=sourceUrl, cooking_mins=cooking_mins, prep_mins=prep_mins, ready_mins=ready_mins)

    # complex_ingredients is a list of dictionaries of each ingredient's details
    complex_ingredients = recipe_details['recipe_info']['ingredients']
    for ingredient in complex_ingredients:
        ingredient_id = ingredient['id']
        amount = ingredient['amount']
        unit = ingredient['unit']
        crud.add_recipe_ingredient(recipe=recipe_id, ingredient_id=ingredient_id, amount=amount, unit=unit)

    # ordered list of recipe's instructions (no numbers)
    instructions_list = recipe_details['recipe_instructions']['instructions']
    # enumerate through list of ordered instructions
    for i, instruction in enumerate(instructions_list):
        # set step_num by adding 1 to indices
        step_num = i + 1
        step_instruction = instruction
        print(step_num, step_instruction)
        # add recipe's instruction step and instructions, one by one to db
        crud.add_instructions(recipe=recipe_id, step_num=step_num, step_instruction=step_instruction)

    # dictionary with equipment name as both key and value
    for equipment in recipe_details['recipe_equipment']:
        pprint(equipment)
        crud.add_equipment(recipe=recipe_id, equipment=equipment)

    # created_recipe = db.session.query(Recipe).all()
    # print(created_recipe)

    return jsonify({'success': True, 'message': 'Recipe added to db!'})


@app.route('/api/save_a_recipe',methods=["POST"])
def add_recipe_to_saved():
    """Add selected recipe to saved recipes table in db

    Only logged in users can save one recipe at a time (one recipe_id passed in POST request body)."""

    print('\n\nin save_a_recipe route')
    # unencode from JSON
    data = request.get_json()
    # information on selected recipe
    recipe_id = data['recipe_id']
    pprint(recipe_id)

    # retrieve session's email to query and check if recipe_id is in their saved recipes.
    users_saved_recipes = crud.get_saved_recipes(session['email'])
    print(len(users_saved_recipes))

    # if user's saved recipes db has data
    if len(users_saved_recipes) > 0:
        # loop through list of saved_recipe objects and check matching recipe_id
        for saved in users_saved_recipes:
            if saved.recipe_id == recipe_id:
                print('recipe already saved')
                message = 'Recipe already exists in user\'s saved list'
                return jsonify({'message': message})

    # if selected recipe NOT in saved, or user's saved recipes is empty
    print('\nselected recipe NOT in db, or user"s saved recipes is empty\n')
    user = crud.get_user_by_email(session.get('email'))
    print(user, user.user_id)
    crud.save_a_recipe(user=user.user_id, recipe=recipe_id, is_favorite=False)
    message = 'Recipe saved to saved_recipes!'

    return jsonify({'message': message})




@app.route('/api/show_saved_recipes')
def show_users_saved_recipes():
    """Show all of user's saved recipes."""

    print('\nin show saved recipes route\n')

    # get a list of saved_recipe objects for existing user
    users_saved_recipes = crud.get_saved_recipes(session.get('email'))

    saved_recipes = []

    for recipe in users_saved_recipes:
        recipe_data = {}
        recipe_data['recipe_info'] = helper_functions.parse_saved_recipe_details(recipe)
        recipe_data['recipe_times'] = helper_functions.parse_saved_recipe_times(recipe)
        recipe_data['recipe_instructions'] = helper_functions.parse_saved_recipe_instructions(recipe)
        recipe_data['recipe_equipment'] = helper_functions.parse_saved_recipe_equipment(recipe)

        recipe_results.append(recipe_data)

    return jsonify(saved_recipes)




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
