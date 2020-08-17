"""Models for ingredient recipe app"""

from flask_sqlalchemy import SQLAlchemy

# Instance of SQLAlchemy
db = SQLAlchemy()


class User(db.Model):
    """A user."""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer,
                         autoincrement=True,
                         primary_key=True)
    email = db.Column(db.String)
    password = db.Column(db.String)

    # list of user's saved recipes
    saved_recipes = db.relationship('Saved_Recipe')

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'


class Saved_Recipe(db.Model):
    """User's saved recipes."""

    __tablename__ = 'saved_recipes'

    saved_id = db.Column(db.Integer,
                         autoincrement=True,
                         primary_key=True)
    recipe_id = db.Column(db.Integer,
                          db.ForeignKey('recipes.recipe_id'))
    user_id = db.Column(db.Integer,
                              db.ForeignKey('users.user_id'))
    favorite = db.Column(db.Boolean)

    # recipe that was saved
    recipe = db.relationship('Recipe')
    # user who saved the recipe
    user = db.relationship('User')

    def __repr__(self):
        return f'<User\'s selected recipes recipe={self.recipe_id} user={self.user_id} is_favorite={self.favorite}>'


class Recipe(db.Model):
    """A recipe."""

    __tablename__ = 'recipes'

    recipe_id = db.Column(db.Integer,
                         primary_key=True)
    title = db.Column(db.String)
    image = db.Column(db.String)
    servings = db.Column(db.Integer)
    sourceUrl = db.Column(db.String)
    cooking_mins = db.Column(db.Integer)
    prep_mins = db.Column(db.Integer)
    ready_mins = db.Column(db.Integer)

    # list of recipe's ingredients
    ingredients = db.relationship('Recipe_Ingredient')
    # list of recipe's instructions by steps (length is number of steps)
    instructions = db.relationship('Instructions')
    # list of instances this recipe is saved by many different users
    saved_recipe_users = db.relationship('Saved_Recipe')
    # list of recipe's equipment(s)
    equipment = db.relationship('Equipment')


    def __repr__(self):
        return f'<Recipe recipe_id={self.recipe_id} title={self.title}>'


class Ingredient(db.Model):
    """An Ingredient."""

    __tablename__ = 'ingredients'

    ingredient_id = db.Column(db.Integer,
                         primary_key=True)
    name = db.Column(db.String)

    # list of recipes this ingredient is part of
    recipes = db.relationship('Recipe_Ingredient')

    def __repr__(self):
        return f'<Ingredient ingredient_id={self.ingredient_id} name={self.name}>'


class Recipe_Ingredient(db.Model):
    """A recipe's ingredient."""

    __tablename__ = 'recipe_ingredients'

    rec_ing_id = db.Column(db.Integer,
                         autoincrement=True,
                         primary_key=True)
    recipe_id = db.Column(db.Integer,
                          db.ForeignKey('recipes.recipe_id'))
    ingredient_id = db.Column(db.Integer,
                              db.ForeignKey('ingredients.ingredient_id'))
    amount = db.Column(db.Float)
    unit = db.Column(db.String)

    # the recipe's ingredient
    ingredient = db.relationship('Ingredient')
    # the recipe the ingredient is part of
    recipe = db.relationship('Recipe')

    def __repr__(self):
        return f'<Recipe Ingredient recipe={self.recipe_id} ingredient={self.ingredient.name}>'


class Instructions(db.Model):
    """A recipe's instructions."""

    __tablename__ = 'instructions'

    instruction_id = db.Column(db.Integer,
                         autoincrement=True,
                         primary_key=True)
    recipe_id = db.Column(db.Integer,
                          db.ForeignKey('recipes.recipe_id'))
    step_num = db.Column(db.Integer)
    step_instruction = db.Column(db.String)


    # recipe the instructions are for
    recipe = db.relationship('Recipe')

    def __repr__(self):
        return f'<Instructions recipe={self.recipe_id} step={self.step_num}>'
        

class Equipment(db.Model):
    """A recipe's equipment."""

    __tablename__ = 'equipment'

    equipment_id = db.Column(db.Integer,
                         autoincrement=True,
                         primary_key=True)
    recipe_id = db.Column(db.Integer,
                          db.ForeignKey('recipes.recipe_id'))
    equipment = db.Column(db.String)

    # recipe the equipment is part of
    recipe = db.relationship('Recipe')
    

def connect_to_db(flask_app, db_uri='postgresql:///recipes', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')

if __name__ == '__main__':
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)

