"""CRUD operations

Create, Read, Update, Delete."""

from model import db, User, Saved_Recipe, Recipe, Ingredient, Recipe_Ingredient, Instructions, connect_to_db

def create_user(email, password):
    """Create a user."""









if __name__ == '__main__':
    from server import app
    connect_to_db(app)