"""Helper functions for routes/apis in server.py"""


from pprint import pprint

def parse_recipe_details(complex_data):
    """Parse only details we need from bulk/complex API endpoint.

    Parse only recipe_id, title, servings, sourceUrl, image, and extended ingredients list."""

    recipes = []

    for recipe in complex_data:
        details = {}
        details['recipe_id'] = recipe['id']
        details['title'] = recipe['title']
        details['servings'] = recipe['servings']
        details['sourceUrl'] = recipe['sourceUrl']
        details['image'] = recipe['image']
        details['ingredients'] = recipe['extendedIngredients']
        recipes.append(details)
    # pprint(recipes)

    return recipes


def parse_recipe_times(complex_data):
    """Parse time information from complex API endpoint.

    Parse only recipe_id, prep mins, cooking mins, and ready mins."""

    recipe_times = []

    for recipe in complex_data:
        times = {}
        # identify each dictionary with recipe's id
        times['recipe_id'] = recipe['id']
        times['preparationMinutes'] = recipe.get('preparationMinutes', 'N/A')
        times['cookingMinutes'] = recipe.get('cookingMinutes', 'N/A')
        times['readyInMinutes'] = recipe.get('readyInMinutes', 'N/A')
        recipe_times.append(times)
    # pprint(recipe_times)

    return recipe_times


def parse_recipe_instructions(complex_data):
    """Parse insturction information from complex API endpoint.

    Parse only instruction's number, step instructions, equipment(s)."""

    recipe_instructions = []

    # temporary variable recipe is now a dictionary of a specific recipe
    for recipe in complex_data:
        instructions = {}
        list_instructions = []
        # identify each dictionary with recipe's id
        instructions['recipe_id'] = recipe['id']
        # instructions are nested inside 'steps' key, complex_instructions is a list
        complex_instructions = recipe['analyzedInstructions'][0]['steps']
        # each 'step' is a dictionary in complex instructions list
        for i, step in enumerate(complex_instructions):
            # create new key with the numbered step and its instructions
            # instructions[str(i + 1)] = step['step']
            list_instructions.append(step['step'])
        # add each recipe's parsed instructions into the full list
        instructions['instructions'] = list_instructions
        recipe_instructions.append(instructions)
        # pprint(instructions)
    # pprint(recipe_instructions)

    return recipe_instructions

def parse_recipe_equipment(complex_data):


    recipe_equipments = []

    # temporary variable recipe is now a dictionary of a specific recipe
    for recipe in complex_data:
        equipments_data = {}
        # make equipments be a set so unique and no duplicates
        equipments = {}

        equipments_data['recipe_id'] = recipe['id']

        complex_instructions = recipe['analyzedInstructions'][0]['steps']
        for step in complex_instructions:
            # each equipment is a dictionary in the list of equipments
            for equipment in step['equipment']:
                equipments[equipment['name']] = equipment['name']
        # key is equipment with value as dict of equipment names -> so no duplicates
        equipments_data['equipments'] = equipments
        recipe_equipments.append(equipments_data)

    # pprint(recipe_equipments)

    return recipe_equipments






