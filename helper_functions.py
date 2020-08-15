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
        times['preparationMinutes'] = recipe['preparationMinutes']
        times['cookingMinutes'] = recipe['cookingMinutes']
        times['readyInMinutes'] = recipe['readyInMinutes']
        recipe_times.append(times)
        # pprint(recipe_times)

    return recipe_times