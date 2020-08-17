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
    recipes['ingredients'] = complex_data['extendedIngredients']

    return recipes


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

    recipe_instructions = {}

    list_instructions = []
    # instructions are nested inside 'steps' key, complex_instructions is a list
    complex_instructions = complex_data['analyzedInstructions'][0]['steps']
    # each 'step' is a dictionary in complex instructions list
    for i, step in enumerate(complex_instructions):
        # create new key with the numbered step and its instructions
        # instructions[str(i + 1)] = step['step']
        list_instructions.append(step['step'])
    # add each recipe's parsed instructions into the full list
    recipe_instructions['instructions'] = list_instructions

    return recipe_instructions

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

    recipes_details['recipe_id'] = saved_recipe.recipe.recipe_id
    recipes_details['title'] = saved_recipe.recipe.title
    recipes_details['servings'] = saved_recipe.recipe.servings
    recipes_details['sourceUrl'] = saved_recipe.recipe.
    recipes_details['image'] = saved_recipe['image']
    recipes_details['ingredients'] = saved_recipe['extendedIngredients']




if __name__ == '__main__':
    from server import app
    connect_to_db(app)

