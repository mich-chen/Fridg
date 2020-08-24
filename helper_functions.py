"""Helper functions for routes/apis in server.py"""

import crud
from model import connect_to_db, db
from pprint import pprint

def parse_recipe_details(complex_data):
    """Parse only details we need from bulk/complex API endpoint.

    Parse only recipe_id, title, servings, sourceUrl, image, and extended ingredients list."""

    recipes = {}

    recipes['recipe_id'] = complex_data['id']
    recipes['title'] = complex_data['title']
    recipes['servings'] = complex_data['servings']
    recipes['sourceUrl'] = complex_data['sourceUrl']
    recipes['image'] = complex_data['image']

    return recipes


def parse_recipe_ingredients(complex_data):
    """Parse recipe's ingredients we need from bulk/complex API endpoint."""

    recipe_ingredients = complex_data['extendedIngredients']

    return recipe_ingredients


def parse_recipe_times(complex_data):
    """Parse time information from complex API endpoint.

    Parse only recipe_id, prep mins, cooking mins, and ready mins."""

    recipe_times = {}

    recipe_times['preparationMinutes'] = complex_data.get('preparationMinutes', 0)
    recipe_times['cookingMinutes'] = complex_data.get('cookingMinutes', 0)
    recipe_times['readyInMinutes'] = complex_data.get('readyInMinutes', 0)

    return recipe_times


def parse_recipe_instructions(complex_data):
    """Parse insturction information from complex API endpoint.

    Parse only instruction's number, step instructions, equipment(s)."""

    instructions_list = []
    # instructions are nested inside 'steps' key, complex_instructions is a list
    complex_instructions = complex_data['analyzedInstructions'][0]['steps']
    # each 'step' is a dictionary in complex instructions list
    for i, step in enumerate(complex_instructions):
        # create new key with the numbered step and its instructions
        # instructions[str(i + 1)] = step['step']
        instructions_list.append(step['step'])
    # add each recipe's parsed instructions into the full list

    return instructions_list

def parse_recipe_equipment(complex_data):

    recipe_equipments = {}

    # make equipments be a set so unique and no duplicates

    complex_instructions = complex_data['analyzedInstructions'][0]['steps']
    for step in complex_instructions:
        # each equipment is a dictionary in the list of equipments
        for equipment in step['equipment']:
            recipe_equipments[equipment['name']] = equipment['name']
    # key is equipment with value as dict of equipment names -> so no duplicates

    return recipe_equipments


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
        info['name'] = ingredient.ingredient.name
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

    # dictionary of dictionaries for recipe's categorized information
    recipe_details = {}

    # dicitonary of recipe's general information:
    # recipe_id, title, servings, sourceUrl, image, ingredients (name, amount, unit)
    recipe_info = {}
    recipe_info['recipe_id'] = recipe.recipe_id
    recipe_info['title'] = recipe.title
    recipe_info['servings'] = recipe.servings
    recipe_info['sourceUrl'] = recipe.sourceUrl
    recipe_info['image'] = recipe.image
    # parse through recipe's ingredients table for info
    ingredients = recipe.ingredients
    ingredients_list = []
    for ingredient in ingredients:
        info = {}
        info['name'] = ingredient.ingredient.name
        info['amount'] = ingredient.amount
        info['unit'] = ingredient.unit
        ingredients_list.append(info)

    recipe_times = {}
    recipe_times['preparationMinutes'] = recipe.prep_mins
    recipe_times['cookingMinutes'] = recipe.cooking_mins
    recipe_times['readyInMinutes'] = recipe.ready_mins

    instructions_list = []
    # list of instructions objects, for each step's instructions
    instructions_objects = recipe.instructions
    for instruction in instructions_objects:
        # add each step's instruction into the full list
        instructions_list.append(instruction.step_instruction)

    recipe_equipment = {}
    # list of equipment objects
    equipment_objects = recipe.equipment
    for equipment in equipment_objects:
        # make equipments be dictionary of unique and no duplicates
        recipe_equipment[equipment.equipment] = equipment.equipment

    recipe_details['recipe_info'] = recipe_info
    recipe_details['recipe_times'] = recipe_times
    recipe_details['recipe_ingredients'] = ingredients_list
    recipe_details['recipe_instructions'] = instructions_list
    recipe_details['recipe_equipment'] = recipe_equipment

    return recipe_details





if __name__ == '__main__':
    from server import app
    connect_to_db(app)

