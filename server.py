"""Server for recipes based on fridge ingredients app."""


# importing all these for now
from flask import (Flask, render_template, request, flash, session, redirect)

# import jinja 2 to make it throw errors for undefined variables
from jinja2 import StrictUndefined

# instance of Flask class, store as app
app = FLask(__name__)
# secret key from api
app.secret_key = ""
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def homepage():
    """Show homepage."""
    
    return render_template("homepage.html")




if __name__ == "__main__":
    # run app with debug mode on and on host computer
    app.run(debug=True, host="0.0.0.0")