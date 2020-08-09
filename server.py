"""Server for recipes based on fridge ingredients app."""


# importing all these for now
from flask import (Flask, render_template, request, flash, session, redirect)

# import jinja 2 to make it throw errors for undefined variables
from jinja2 import StrictUndefined

# instance of Flask class, store as app
app = Flask(__name__)
# secret key from api
app.secret_key = "blah"
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def homepage():
    """Show homepage."""

    return render_template("homepage.html")

@app.route('/login', methods=["POST"])
def process_login():

    email = request.form.get('email')
    password = request.form.get('password')

    flash('hit login route!')

    # function to check if email exists in db

    # conditional if email exists, flash message
    # else create a new user in db and flash message

    return redirect('/')





if __name__ == "__main__":
    # run app with debug mode on and on host computer
    app.run(debug=True, host="0.0.0.0")