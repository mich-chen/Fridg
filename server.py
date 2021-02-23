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

# import twilio SDK
from twilio.rest import Client


# instance of Flask class, store as app
app = Flask(__name__)

app.secret_key = "secretkey"
app.jinja_env.undefined = StrictUndefined

# Spoonacular API key
API_KEY = os.environ["SPOONACULAR_KEY"]
# Twilio account SID
TWILIO_SID = os.environ["TWILIO_SID"]
# Twilio Auth Token
TWILIO_TOKEN = os.environ["TWILIO_TOKEN"]


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

    # unencode from JSON
    data = request.get_json()
    email = data['email']
    password = data['password']

    # function to check if email exists in db
    existing_user = crud.get_user_by_email(email=email)

    # check if email exists in db, if so also check correct password
    if existing_user and password == existing_user.password:
        # create session for user
        session['email'] = email
        # set new message
        message = 'Valid user. Successfully logged in.'
        success = True

    # if password does not match, and email already exists in db
    else:
        # set new message
        message = 'Incorrect email or password. Try again.'
        success = False

    return jsonify({'success': success, 'message': message})



@app.route('/api/create_account', methods=["POST"])
def create_account():
    """Create new account and store in db."""

    # unencode from JSON
    data = request.get_json()
    email = data['email']
    password = data['password']
    phone = '+1' + data['phone']

    # function to check if email exists in db
    existing_user = crud.get_user_by_email(email=email)

    # if no return from db for this email
    if existing_user == None:
        new_user = crud.create_user(email=email, password=password, phone=phone)
        # create session for user
        session['email'] = email
        message = 'Successfully created new account!'
        success = True

    # if returned an object from db, then email already exists
    else:
        message = 'Email exists already! You cannot create new account with that email. Try again.'
        success = False

    return jsonify({'success': success, 'message': message})



@app.route('/api/check_session')
def check_if_logged_in():
    """Check if active session/logged in user."""

    if session.get('email'):
        return jsonify({'in_session': True})
    else:
        return jsonify({'in_session': False})


@app.route('/api/logout')
def process_logout():
    """Remove user's session after logout."""

    session.pop('email', None)

    return jsonify({'message': 'Logged out!'})



@app.route('/api/search_results', methods=["POST"])
def search_results():
    """Make API request for search results."""

    # unencode from JSON
    data = request.get_json()
    # User's input is a string of comma-separated list of ingredients 
    input_ingredients_str = data['ingredients']

    # spoonacular's api url
    url = "https://api.spoonacular.com/recipes/complexSearch"
    # api parameters
    payload = {"apiKey": API_KEY, 
               "includeIngredients": input_ingredients_str,
               "addRecipeInformation": True,
               "sort": "max-used-ingredients",
               "instructionsRequired": True,
               "fillIngredients": True,
               "number": 15,
               } 
    # make http request to spoonacular's complexSearch API
    res = requests.get(url, params=payload)
    # convert json into python dictionary -> API is a List of dictionaries
    data = res.json()
    # list of recipes (which are dictionaries about recipe details)
    recipes_complex_data = data['results']

    recipe_results = []
    # parse only details we need from api endpoint
    for recipe in recipes_complex_data:
        recipe_data = helper_functions.parse_API_recipe_details(recipe)
        recipe_results.append(recipe_data)

    return jsonify(recipe_results)



@app.route('/api/check_results', methods=["POST"])
def check_if_saved_recipe():
    """Checked if recipes saved, if yes then add a key indicating. """

    data = request.get_json()
    recipes_list = data['results_list']

    if session.get('email') == None:
        # if not logged in or in session, then all recipes show as not saved
        for recipe in recipes_list:
            recipe['is_saved'] = False

        return jsonify({'checked_recipes': recipes_list, 'success': True, 'message': 'You need to create an account to see saved recipes!'})

    users_saved_recipes = crud.get_saved_recipes(session.get('email'))
    # set of saved recipe ids
    saved_ids = {saved['recipe_id'] for saved in users_saved_recipes}

    # iterate through list of recipes, if recipe id is in set of saved ids, is_saved is true
    for recipe in recipes_list:
        recipe_id = recipe['recipe_id']
        recipe['is_saved'] = recipe_id in saved_ids

    return jsonify({'checked_recipes': recipes_list, 'success': True, 'message': 'Checked results for any saved recipes!'})



@app.route('/api/add_recipe', methods=["POST"])
def add_recipe_to_db():
    """Add selected recipe to recipes table in db."""

    # unencode from JSON
    data = request.get_json()
    recipe_details = data['recipe_details']
    recipe_id = recipe_details['recipe_id']
    # must log in to save a recipe
    if session.get('email') == None:
        return jsonify({'success': False, 'message': 'You need to create an account to save a recipe!'})

    # find if recipe already exists in db
    existing_recipe = crud.quick_get_recipe(recipe_id)

    if existing_recipe != None:
        return jsonify({'success': True, 'message': 'Recipe already in db, procdeed to saving'})

    print('\n new recipe, adding to db \n')
    title = recipe_details['title']
    image = recipe_details['image']
    servings = recipe_details['servings']
    sourceUrl = recipe_details['sourceUrl']
    cooking_mins = recipe_details['cooking_mins']
    prep_mins = recipe_details['prep_mins']
    ready_mins = recipe_details['ready_mins']
    # add recipe's title, image, and servings to recipes table in db
    crud.create_recipe(recipe_id=recipe_id, title=title, image=image, servings=servings, sourceUrl=sourceUrl, cooking_mins=cooking_mins, prep_mins=prep_mins, ready_mins=ready_mins)

    # add each individual ingredient of recipe to db.
    for ingredient in recipe_details['ingredients']:
        ingredient_id = ingredient['ingredient_id']
        name = ingredient['name']
        amount = ingredient['amount']
        unit = ingredient['unit']
        crud.add_recipe_ingredient(recipe=recipe_id, ingredient_id=ingredient_id, amount=amount, unit=unit, name=name)

    # add each instructions step and string to db
    for i, instruction in enumerate(recipe_details['instructions']):
        # set step_num by adding 1 to indices
        step_num = i + 1
        step_instruction = instruction
        crud.add_instructions(recipe=recipe_id, step_num=step_num, step_instruction=step_instruction)

    # add each key of equipment to db
    for equipment in recipe_details['equipment']:
        crud.add_equipment(recipe=recipe_id, equipment=equipment)

    return jsonify({'success': True, 'message': 'Recipe added to db!'})



@app.route('/api/save_a_recipe',methods=["POST"])
def add_recipe_to_saved():
    """Add selected recipe to saved recipes table in db

    Only logged in users can save one recipe at a time (one recipe_id passed in POST request body)."""

    # unencode from JSON
    data = request.get_json()
    recipe_id = data['recipe_id']
    users_saved_recipes = crud.get_saved_recipes(session['email'])

    # if user's saved recipes db has data
    if len(users_saved_recipes) > 0:
        # iterate and check if recipe already saved
        for saved in users_saved_recipes:
            if saved['recipe_id'] == recipe_id:
                print('recipe already saved')
                message = 'Recipe already exists in user\'s saved list'
                return jsonify({'success': True, 'message': message})

    # if selected recipe NOT in saved, or user's saved recipes is empty
    print('\nselected recipe NOT in db, or user\'s saved recipes is empty\n')
    user = crud.get_user_by_email(session.get('email'))
    crud.save_a_recipe(user=user.user_id, recipe=recipe_id, is_favorite=False)
    message = 'Recipe saved to saved_recipes!'

    return jsonify({'success': True, 'message': message})



@app.route('/api/favorite_a_recipe', methods=["POST"])
def favorite_a_recipe():
    """Favorite a saved recipe."""

    # unencode from JSON
    data = request.get_json()
    recipe_id = data['recipe_id']
    crud.favorite_a_recipe(recipe_id, session.get('email'))

    return jsonify({'success': True,'message': 'successfully favorited this recipe!'})



@app.route('/api/saved_recipe_details/<recipe_id>')
def get_saved_recipe_details(recipe_id):
    """Return details of one saved recipe given id."""

    if session.get('email') == None:
        return jsonify({'recipe_details': [], 'success': False, 'message': 'You need to create an account to see a saved recipe\'s details!'})

    email = session.get('email')
    # get recipe as saved recipe for 'favorite' data
    saved_recipe = crud.get_a_saved_recipe(recipe_id, email).as_dict()
    # represent recipe details as dictionary
    recipe_details = helper_functions.parse_db_recipe_details(saved_recipe['recipe'])
    # add 'favorite' boolean data to details
    recipe_details['favorite'] = saved_recipe['favorite']

    return jsonify({'recipe_details': recipe_details, 'message': 'returning a saved recipe\'s details'})



@app.route('/api/saved_recipes')
def get_saved_recipes():
    """Get all of user's saved and favorited recipes."""

    if session.get('email') == None:
        return jsonify({'saved_recipes': [], 'success': False, 'message': 'You need to create an account to see saved recipes!'})

    # get a list of saved_recipe objects for existing user
    users_saved_recipes = crud.get_saved_recipes(session.get('email'))

    saved_recipes = []
    for saved in users_saved_recipes:
        recipe_details = helper_functions.parse_db_recipe_details(saved['recipe'])
        recipe_details['favorite'] = saved['favorite']
        saved_recipes.append(recipe_details)

    return jsonify({'saved_recipes': saved_recipes, 'message': 'list of user\'s saved recieps!'})



@app.route('/api/remove_recipe', methods=["POST"])
def remove_from_saved():
    """Remove recipe from user's saved recipes list."""

    data = request.get_json()
    recipe_id = data['recipe_id']
    email = session.get('email')
    # remove_recipe returns boolean True
    removed = crud.remove_recipe(recipe_id, email)
    # success is boolean
    success = removed

    return jsonify({'success': success, 'message': 'Recipe removed from saved'})


@app.route('/api/shopping-list', methods=["POST"])
def send_shopping_list():
    """Send shopping list of ingredients to user's phone via Twilio API."""
    # pass phone as string to 'to=' in message
    email = session.get('email')
    phone = crud.get_user_phone(email)

    data = request.get_json()
    list_items = data['shopping_list']
    recipe_title = data['recipe_title']
    shopping_list = "\n".join(list_items.keys())
    
    client = Client(TWILIO_SID, TWILIO_TOKEN)

    try:
        message = client.messages.create(
            to=str(phone),
            from_="+14158180714",
            body=f'\nThanks for using Fridg!\n'
                f'{recipe_title} shopping list:\n'
                f'{shopping_list}'
                )
        return jsonify({'success': True, 'message': 'Shopping list sent to your phone!'})
    except:
        error = "Number is not valid, please input correct phone number in format +1xxxxxxxxxx"
        return jsonify({'success': False, 'message': error})

@app.route('/api/user_thoughts/<recipe_id>')
def get_user_thoughts(recipe_id):
    """Get a user's thoughts on a saved recipe from db."""

    email = session.get('email')
    saved_recipe_thoughts = crud.get_a_saved_recipe(recipe_id, email).as_dict()

    del saved_recipe_thoughts['recipe']
    del saved_recipe_thoughts['user']

    if saved_recipe_thoughts['rating'] != None:
        saved_recipe_thoughts['rating'] = list(range(1, saved_recipe_thoughts['rating'] + 1))
    else:
        saved_recipe_thoughts['rating'] = []

    return jsonify({'thoughts': saved_recipe_thoughts, 'message': 'retrieved user\'s food for thought!'})


@app.route('/api/update_user_thoughts', methods=["POST"])
def update_user_thoughts():
    """Update a user's thoughts on a saved recipe."""
    data = request.get_json()
    tried_str = (data.get('tried'))
    rating = data.get('rating')
    comment = data.get('comment')
    recipe_id = data.get('recipe_id')

    email = session.get('email')
    saved_recipe = crud.get_a_saved_recipe(recipe_id, email)

    if tried_str != None:
        tried = bool(tried_str)
        crud.update_tried(saved_recipe=saved_recipe, tried=tried)

    if rating != None:
        crud.update_rating(saved_recipe=saved_recipe, rating=rating)

    if comment != None:
        crud.update_comment(saved_recipe=saved_recipe, comment=comment)

    return jsonify({'success': True, 'message': 'updated user\'s food for thought!'})



if __name__ == '__main__':
    # Connect to db first, then app can access it.
    app.debug = True
    connect_to_db(app)
    # DebugToolbarExtension(app)
    app.run(host='0.0.0.0')
