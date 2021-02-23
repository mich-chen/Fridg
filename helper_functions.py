"""Helper functions for routes/apis in server.py"""

import crud
from model import connect_to_db, db

# ***** Parse Spoonacular's API Endpoint data (Complex Search data) *****

def parse_API_recipe_details(complex_data):
    """Parse only details we need from bulk/complex API endpoint."""

    recipe_data = {}

    recipe_data['recipe_id'] = complex_data['id']
    recipe_data['title'] = complex_data['title']
    recipe_data['servings'] = complex_data['servings']
    recipe_data['sourceUrl'] = complex_data['sourceUrl']
    recipe_data['image'] = complex_data['image']
    recipe_data['prep_mins'] = complex_data.get('preparationMinutes', 0)
    recipe_data['cooking_mins'] = complex_data.get('cookingMinutes', 0)
    recipe_data['ready_mins'] = complex_data.get('readyInMinutes', 0)

    # parse ingredients list, each ingredient is dictionary of details
    ingredients = []
    for ingredient in complex_data['extendedIngredients']:
        ingredient_dict = {}
        ingredient_dict['ingredient_id'] = ingredient['id']
        ingredient_dict['name'] = ingredient['name']
        ingredient_dict['amount'] = round(ingredient['amount'], 2)
        ingredient_dict['unit'] = ingredient['measures']['us']['unitShort']
        ingredients.append(ingredient_dict)
    recipe_data['ingredients'] = ingredients

    # parse instructions, as list of string instructions
    instructions = [step['step'] for step in complex_data['analyzedInstructions'][0]['steps']]
    recipe_data['instructions'] = instructions
    
    # parse equipment as dictionary, no duplicate equipment
    equipment = {equipment['name']: equipment['name'] 
                 for step in complex_data['analyzedInstructions'][0]['steps']
                 for equipment in step['equipment'] 
                 }
    recipe_data['equipment'] = equipment

    missed_ingredients = []
    for ingredient in complex_data['missedIngredients']:
        ingredient_dict = {}
        ingredient_dict['name'] = ingredient['name']
        ingredient_dict['amount'] = round(ingredient['amount'],2)
        ingredient_dict['unit'] = ingredient['unitShort']
        missed_ingredients.append(ingredient_dict)
    recipe_data['missing_ingredients'] = missed_ingredients

    return recipe_data


# ***** Parsing recipes from db (sqlAlchemy objects) *****

def parse_db_recipe_details(recipe):
    """Return dictionary of a db recipe's details information."""

    recipe_details = recipe.as_dict()

    ingredients = [ingredient.as_dict() for ingredient in recipe_details['ingredients']]
    instructions = [instruction.as_dict()['step_instruction'] for instruction in recipe_details['instructions']]
    equipment = {equipment.as_dict()['equipment']: equipment.as_dict()['equipment'] for equipment in recipe_details['equipment']}
    # reassign values from db objects as python dictionaries
    recipe_details['ingredients'] = ingredients
    recipe_details['instructions'] = instructions
    recipe_details['equipment'] = equipment

    return recipe_details



if __name__ == '__main__':
    from server import app
    connect_to_db(app)

