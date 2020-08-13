"""CRUD operations

Create, Read, Update, Delete."""

from model import db, User, Saved_Recipe, Recipe, Ingredient, Recipe_Ingredient, Instructions, connect_to_db

def create_user(email, password):
    """Create an user."""

    # Instantiate an User 
    user = User(email=email, password=password)

    # add new instance of user to db and commit
    db.session.add(user)
    db.session.commit()

    return user

def get_user_by_email(email):
    """Retrieve user by email."""

    # Use .first() so if none, then won't throw error
    return db.session.query(User).filter_by(email=email).first()


def create_ingredient(ingredient_id, name):
    """Create an ingredient.

    Used to seed top-1k-ingredients.csv to db."""

    # Instantiate an Ingredient
    ingredient = Ingredient(ingredient_id=ingredient_id, name=name)

    # add to database
    db.session.add(ingredient)
    db.session.commit()

    return ingredient

def save_a_recipe(user, recipe, is_favorite):
    """Saves a recipe user picked."""

    # Instantiate a saved recipe
    saved_recipe = Saved_Recipe(user_id=user, recipe_id=recipe, favorite=is_favorite)

    # add to database
    db.session.add(saved_recipe)
    db.session.commit()

    return saved_recipe

def create_recipe(title, image, servings):
    """Create a recipe."""

    # Instantiate a recipe
    recipe = Recipe(title=title, image=image, servings=servings)

    # add to database
    db.session.add(recipe)
    db.session.commit()

    return recipe


def add_recipe_ingredient(recipe, ingredient, amount, unit):
    """Add a recipe's ingredient to database."""

    # Instantiate a recipe's ingredient
    recipe_ingredient = Recipe_Ingredient(recipe_id=recipe, ingredient_id=ingredient, amount=amount, unit=unit)

    # add to database
    db.session.add(recipe_ingredient)
    db.session.commit()

    return recipe_ingredient

def add_instructions(recipe, step_num, instruction, cooking_mins, prep_mins, ready_mins, equipment):
    """Add recipe's instructions."""

    # Instantiate a recipe's instructions
    instructions = Instructions(recipe_id=recipe, step_num=step_num, step_instruction=instruction, cooking_mins=cooking_mins, prep_mins=prep_mins, ready_mins=ready_mins, equipment=equipment)

    # add to database
    db.session.add(instructions)
    db.session.commit()

    return instructions



if __name__ == '__main__':
    from server import app
    connect_to_db(app)