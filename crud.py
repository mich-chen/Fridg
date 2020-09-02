"""CRUD operations

Create, Read, Update, Delete."""

from model import db, User, Saved_Recipe, Recipe, Recipe_Ingredient, Instructions, Equipment, connect_to_db

# ***** User class crud functions *****

def create_user(email, password, phone):
    """Create an user."""

    # Instantiate an User 
    user = User(email=email, password=password, phone=phone)

    # add new instance of user to db and commit
    db.session.add(user)
    db.session.commit()

    return 


def get_user_by_email(email):
    """Retrieve user by email."""

    # Use .first() so if none, then won't throw error
    return db.session.query(User).filter_by(email=email).first()


def get_user_phone(email):
    """Return user's phone number by email."""
    phone = db.session.query(User.phone).filter_by(email=email).first()

    return phone


# ***** Saved Recipe class crud functions *****

def save_a_recipe(user, recipe, is_favorite):
    """Saves a recipe user picked."""

    # Instantiate a saved recipe
    saved_recipe = Saved_Recipe(user_id=user, recipe_id=recipe, favorite=is_favorite)

    # add to database
    db.session.add(saved_recipe)
    db.session.commit()

    return


def get_saved_recipes(email):
    """Show all of user's saved recipes.

    Return a list of user's saved recipes as objects."""

    # eagarly load query so can access each saved recipe's ingredients, details, and instructions
    user = User.query.filter_by(email=email).join(Saved_Recipe, Recipe, Recipe_Ingredient, Instructions, Equipment).first()

    # if user does not have any saved_recipes
    if user == None:
        return []

    saved_list = [saved.as_dict() for saved in user.saved_recipes]

    return saved_list 

def get_a_saved_recipe(recipe_id, email):
    """Return saved recipe object given id and user's email."""

    saved_recipe = db.session.query(Saved_Recipe).filter(User.email == email).group_by(Saved_Recipe.recipe_id, Saved_Recipe.saved_id).having(Saved_Recipe.recipe_id == recipe_id).join(User, Recipe, Recipe_Ingredient, Instructions, Equipment).first() 

    return saved_recipe.as_dict()


def update_tried(saved_recipe, tried):
    """Add/update user's tried."""

    saved_recipe.tried = tried
    db.session.commit()

    return saved_recipe


def update_comment(saved_recipe, comment):
    """Add/update user's comment."""

    saved_recipe.comment = comment
    db.session.commit()

    return saved_recipe


def update_rating(saved_recipe, rating):
    """Add/update user's rating."""

    saved_recipe.rating = rating
    db.session.commit()

    return saved_recipe


def get_user_thoughts(saved_recipe):
    """Get tried, rating, and comments on a user's saved recipe."""

    thoughts = {}
    thoughts['tried'] = saved_recipe.tried
    thoughts['rating'] = saved_recipe.rating
    thoughts['comment'] = saved_recipe.comment

    return thoughts


def favorite_a_recipe(recipe_id, email):
    """Favorite a saved recipe from db."""

    favorited_recipe = Saved_Recipe.query.filter(Saved_Recipe.recipe_id == recipe_id, User.email == email).join(User).first()
    favorited_recipe.favorite = True

    db.session.commit()

    return


def get_favorited_saved_recipes(email):
    """show user's favorited saved recipes."""

    # list of user's saved recipes where favorite == True (favorited saved recipe)
    favorited_recipes = db.session.query(Saved_Recipe.recipe_id).filter(User.email == email).group_by(Saved_Recipe.favorite,Saved_Recipe.recipe_id).having(Saved_Recipe.favorite == True).join(User).all()

    return favorited_recipes


# ***** Recipe class crud functions *****

def create_recipe(recipe_id, title, image, servings, sourceUrl, cooking_mins, prep_mins, ready_mins):
    """Create a recipe."""

    # Instantiate a recipe
    recipe = Recipe(recipe_id=recipe_id, title=title, image=image, servings=servings, sourceUrl=sourceUrl, cooking_mins=cooking_mins, prep_mins=prep_mins, ready_mins=ready_mins)

    # add to database
    db.session.add(recipe)
    db.session.commit()

    return


def get_recipe(recipe_id):
    """Retrieve a recipe from database."""

    recipe = db.session.query(Recipe).filter(Recipe.recipe_id == recipe_id).join(Saved_Recipe, User, Recipe_Ingredient, Instructions, Equipment).first() 

    return recipe


def quick_get_recipe(id_num):
    """Return recipe_id if exists in db."""

    recipe = Recipe.query.filter_by(recipe_id=id_num).first()
    
    return recipe


def add_recipe_ingredient(recipe, ingredient_id, amount, unit, name):
    """Add a recipe's ingredient to database."""

    # Instantiate a recipe's ingredient
    recipe_ingredient = Recipe_Ingredient(recipe_id=recipe, ingredient_id=ingredient_id, amount=amount, unit=unit, name=name)

    # add to database
    db.session.add(recipe_ingredient)
    db.session.commit()

    return


def add_instructions(recipe, step_num, step_instruction):
    """Add recipe's instructions, one by one, to databasee."""

    # Instantiate a recipe's instructions
    instructions = Instructions(recipe_id=recipe, step_num=step_num, step_instruction=step_instruction)

    # add to database
    db.session.add(instructions)
    db.session.commit()

    return


def add_equipment(recipe, equipment):
    """Add recipe's equipment, one by one, to database."""

    # Instantiate a recipe's equipment
    equipment = Equipment(recipe_id=recipe, equipment=equipment)

    # add to database
    db.session.add(equipment)
    db.session.commit()

    return


def remove_recipe(recipe_id, email):
    """Remove recipe from user's saved recipes."""

    recipe = db.session.query(Saved_Recipe).filter(Saved_Recipe.recipe_id == recipe_id, User.email == email).first()

    # delete from database
    db.session.delete(recipe)
    db.session.commit()

    return True

if __name__ == '__main__':
    from server import app
    connect_to_db(app)