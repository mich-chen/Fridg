"""Script to seed database"""

# Import os and libraries
import os
import json
import csv

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

# read and open ingredients csv
file = open('top-1k-ingredients.csv', newline='')
data = csv.reader(file, delimiter=';')
# each row is a list of 2, name and id
ingredients_data = {row[1]:row[0] for row in data}
# make id as key and name as value

# loop over ingredients dictionary
for ingredient in ingredients_data:
    # create an ingredient and save to db
    crud.create_ingredient(ingredient_id=ingredient, name=ingredients_data[ingredient])
