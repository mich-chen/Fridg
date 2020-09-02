"""Helper functions for routes/apis in server.py"""

import crud
from model import connect_to_db, db
from pprint import pprint


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


def parse_saved_recipe_details(saved_recipe):
    """Return dictionary of saved recipe's details parsed from db object."""
    recipes_details = {}

    recipes_details['recipe_id'] = saved_recipe.recipe_id
    recipes_details['title'] = saved_recipe.recipe.title
    recipes_details['servings'] = saved_recipe.recipe.servings
    recipes_details['sourceUrl'] = saved_recipe.recipe.sourceUrl
    recipes_details['image'] = saved_recipe.recipe.image
    recipes_details['favorite'] = saved_recipe.favorite # boolean

    return recipes_details


def parse_saved_recipe_ingredients(saved_recipe):
    """Return dictionary of saved recipe's ingredients parsed from db object."""

    saved_recipe_ingredients = {}

    # list of recipe_ingredient objects
    recipe_ingredients = saved_recipe.recipe.ingredients

    recipe_ingredients_list = []
    for ingredient in recipe_ingredients:
        info = {}
        info['name'] = ingredient.name
        info['amount'] = ingredient.amount
        info['unit'] = ingredient.unit
        recipe_ingredients_list.append(info)

    saved_recipe_ingredients['ingredients'] = recipe_ingredients_list

    return recipe_ingredients_list


def parse_saved_recipe_times(saved_recipe):
    """Return dictionary of saved recipe's times parsed from db object."""

    recipe_times = {}

    recipe_times['preparationMinutes'] = saved_recipe.recipe.prep_mins
    recipe_times['cookingMinutes'] = saved_recipe.recipe.cooking_mins
    recipe_times['readyInMinutes'] = saved_recipe.recipe.ready_mins

    return recipe_times


def parse_saved_recipe_instructions(saved_recipe):
    """Return dictionary of saved recipe's instructions parsed from db object."""

    instructions_list = []
    # list of instructions objects, for each step's instructions
    instructions_objects = saved_recipe.recipe.instructions
    for instruction in instructions_objects:
        # add each step's instruction into the full list
        instructions_list.append(instruction.step_instruction)

    return instructions_list


def parse_saved_recipe_equipment(saved_recipe):
    """Return dictionary of saved recipe's instructions parsed from db object."""

    recipe_equipments = {}

    # list of equipment objects
    equipment_objects = saved_recipe.recipe.equipment
    for equipment in equipment_objects:
        # make equipments be dictionary of unique and no duplicates
        recipe_equipments[equipment.equipment] = equipment.equipment

    return recipe_equipments


def parse_db_recipe_details(recipe):
    """Return dictionary of a db recipe's details information."""

    recipe_details = recipe.as_dict()

    ingredients = [ingredient.as_dict() for ingredient in recipe_details['ingredients']]
    instructions = [instruction.as_dict() for instruction in recipe_details['instructions']]
    equipment = [equipment.as_dict() for equipment in recipe_details['equipment']]
    # reassign values from db objects as python dictionaries
    recipe_details['ingredients'] = ingredients
    recipe_details['instructions'] = instructionst
    recipe_details['equipment'] = equipment

    return recipe_details



if __name__ == '__main__':
    from server import app
    connect_to_db(app)

