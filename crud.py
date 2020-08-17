"""CRUD operations

Create, Read, Update, Delete."""

from model import db, User, Saved_Recipe, Recipe, Ingredient, Recipe_Ingredient, Instructions, Equipment, connect_to_db

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


def show_saved_recipes(user_id):
    """Show all of user's saved recipes."""

    # return a list of user's saved recipes as objects
    # eagarly load query so can access each saved recipe's ingredients, details, and instructions

    # user = User.query.filter_by(user_id=user_id)
    # saved_recipes_list = Saved_Recipe.query.filter_by(user_id=user).options(db.joinedload(Recipe, Recipe_Ingredient, Instructions, Equipment)).all()
    
    saved_recipes_list = Saved_Recipe.query.filter_by(user_id=user_id).all()

    return saved_recipes_list 


def find_recipe(recipe_id):
    """Retrieve a recipe from database.

    Used after user has saved a recipe, which populated recipes table and then use when showing all saved recipes."""
    return Recipe.query.filter_by(recipe_id=recipe_id).first()


def create_recipe(recipe_id, title, image, servings, cooking_mins, prep_mins, ready_mins):
    """Create a recipe."""

    # Instantiate a recipe
    recipe = Recipe(recipe_id=recipe_id, title=title, image=image, servings=servings, cooking_mins=cooking_mins, prep_mins=prep_mins, ready_mins=ready_mins)

    # add to database
    db.session.add(recipe)
    db.session.commit()

    return recipe


def add_recipe_ingredient(recipe, ingredient_id, amount, unit):
    """Add a recipe's ingredient to database."""

    # Instantiate a recipe's ingredient
    recipe_ingredient = Recipe_Ingredient(recipe_id=recipe, ingredient_id=ingredient_id, amount=amount, unit=unit)

    # add to database
    db.session.add(recipe_ingredient)
    db.session.commit()

    return recipe_ingredient


def add_instructions(recipe, step_num, step_instruction):
    """Add recipe's instructions, one by one, to databasee."""

    # Instantiate a recipe's instructions
    instructions = Instructions(recipe_id=recipe, step_num=step_num, step_instruction=step_instruction)

    # add to database
    db.session.add(instructions)
    db.session.commit()

    return instructions


def add_equipment(recipe, equipment):
    """Add recipe's equipment, one by one, to database."""

    # Instantiate a recipe's equipment
    equipment = Equipment(recipe_id=recipe, equipment=equipment)

    # add to database
    db.session.add(equipment)
    db.session.commit()

    return equipment

if __name__ == '__main__':
    from server import app
    connect_to_db(app)