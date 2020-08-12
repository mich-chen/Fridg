"""Script to seed database"""

# Import os 
import os

# Import dabase model, crud, and server
import crud
import model
import server

# Drop and create db
os.system('dropdb recipes')
os.system('createdb recipes')

# Connect db to Flask app
model.connect_to_db(server.app)

# Create tables from classes inherited from db.model
model.db.create_all()
