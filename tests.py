from unittest import TestCase
from server import app
from model import connect_to_db, db
from flask import session
from flask_debugtoolbar import DebugToolbarExtension
import pdb






if __name__ == '__main__':
    app.debug = True
    DebugToolbarExtension(app)

    app.run(host='0.0.0.0')