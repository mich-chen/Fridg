# <img src="/static/img/Fridg.png" width="30%" alt="Fridg">
 Fridg is a web application that strives to help reduce food waste by using Spoonacular's API to provide recipes maximizing ingredients on hand. Fridg also provides a checklist of missing ingredients which users may send as a shopping list to their phone via the Twilio API. Users may also save recipes and document their experiences to reference back to, such as if they've tried the recipe, give a 5-star rating, and add comments. Fridg is a full-stack, single page web app, built using React, Python, Flask, and PostgreSQL. Our ingredients are one big happy family in the fridge. And family means no ingredient left behind or forgotten.

 ## About Me
 Hi and welcome! Michelle worked in a cancer precision medicine lab performing experiments on tissue specimens and analyzing drug responses. Michelle came to realize the true scientific method was utterly inefficient, left little room for creative problem solving, and didn't see herself growing in the field. She was extremely drawn to the efficiency and flexibility of problem solving, debugging, and testing along each step of coding. Turns out, coding is the scientific method on steroids! Software engineering and programming came naturally to her and she knew it was a perfect fit after every coding challenge she found herself more motivated and wanting to work harder. Software engineering provides many opportunities for growth and for Michelle to explore her creative problem-solving side! 

## Contents
* [Tech Stack](#tech-stack)
* [Features](#features)
* [Future State](#future-state)
* [Installation](#installation)

## <a name="tech-stack"></a>Technologies
* React
* JavaScript
* Python
* Flask
* PostgreSQL
* SQLAlchemy ORM
* HTML
* CSS
* Bootstrap / React Bootstrap
* Twilio
* Spoonacular

## <a name="features"></a>Features

### Landing Page
Users may login, create new account, or continue as a guest. Login and create account forms make a JavaScript fetch request to my Python and Flask backend to validate user email and passwords. Create an account on the Landing page is made using React Boostrap's Collapse component. If users choose to continue as guests, they have access to logging in or signing up in the navbar, which will render a React modal window.


### Homepage
Once logged in, users can view search form again without authentication components. Users now have access to their saved recipes, search results, and the option to log out. 

useContext provides global access to user authentication to conditionally render navlinks.


### Guests and Logged In Users
Michelle wanted to allow all guests and users access to search recipes. Logged in users may save recipes and send a shopping list to their phone. However, guests will be prompted to login or create an account if they wish to save a recipe or send a shopping list to their phone.



### Searching Recipes by Ingredients
When users or guests search ingredients they have on hand, an asynchronous fetch request is made to my backend and Spoonacular's API to return recipes maximizing the queried ingredients.


Using a RESTful API on Fridg's backend, search results are checked for any previously saved recipes and conditionally renders buttons accordingly.


### Recipe Details From Search Results
Spoonacular's data includes missing ingredients which users may send as a shopping list to their phone via the Twilio API.

Missing ingredients component is conditionally rendered only when selected recipe is from search results. This is acheived using props, useState, useEffect, and React Router to navigate and render unique components.



### Recipe Details From Saved Recipes
Users may save, favorite, and add their experiences with a recipe.

Similar to recipe details from search results, this is acheived using props, useState, useEffect, and React Router. When recipe is saved, data is stored in PostgreSQL database.


### Food For Thoughts
Food For Thoughts is a section users may reference back to for each saved recipe. Users can log if they've tried a recipe, give a 5-star rating, and add any comments. Users can update this section as many times and however they'd like. 

Fridg uses React hooks, such as useContext, useState, and useEffect, to conditionally render this component depending if user accessed recipe details from Saved or Search Results. Each component of Food For Thoughts lifts state up to a common parent component and useEffect fetches a RESTful API to return and display most recent updated data as user interacts with components.


### Removing Recipe
Users may remove a recipe from their saved recipes. 

This feature takes advantage of useEffect and useState hooks to dynamically render user's saved recipes as a recipe is removed. State is updated from button's event listener, triggering the useEffect to fetch newly updated data in backend, and updates new state, causing page to rerender recipe cards.

![alt text](https://github.com/mich-chen/Fridg/blob/master/static/img/remove-recipe.gif "Remove Recipe")

## <a name="future"></a>Future State
The project roadmap for Fridg has several features planned out for the next sprint:

* Incorporate password encryption and hashing
  * later OAuth for stricter security and login options
* Add social aspect to webapp
  * Add username field
  * Add friend list
  * Users can share and have access to others' saved recipes
* Add sorting and filters in search results for time, maximum/minimum ingredients, food group, etc.
  * or add sorting options as dropdown menu in search bar
* Image processing with Spoonacular's API to search recipes based on food or ingredients identified in a photo
* Built-in unit conversions for recipe ingredients


## <a name="installation"></a>Installation
To run Fridg on your own machine:

Install PostgreSQL (Mac OSX)

Fridg is styled using [React Bootstrap](https://react-bootstrap.github.io), [Bootstrap](https://getbootstrap.com), [icons8](https://icons8.com), and [Font Awesome](https://fontawesome.com). CDNs are included in <kbd>root.html</kbd>

Clone or fork this repo:
```
$ https://github.com/mich-chen/Fridg.git
```

Create and activate a virtual environment inside your Fridg directory:
```
$ virtualenv env
$ source env/bin/activate
```

Install the dependencies:
```
$ pip install -r requirements.txt
```

Sign up to use the:
* [Spoonacular API](https://spoonacular.com/food-api)
* [Twilio API](https://www.twilio.com)

Save your API keys in a file called <kbd>secrets.sh</kbd> using this format:

```
export SPOONACULAR_KEY="YOUR_KEY_HERE"
export TWILIO_SID="YOUR_KEY_HERE"
export TWILIO_TOKEN="YOUR_KEY_HERE"
```

Source your keys from your secrets.sh file into your virtual environment:

```
$ source secrets.sh
```

Set up the database:

```
$ createdb recipes
$ python3 model.py
```

Run the app:

```
$ python3 server.py
```

Navigate to [http://localhost:3000](http://localhost:3000) to access Fridg in your browser to begin your recipe adventures!


## Learn More

### React
Check out the [React documentation](https://reactjs.org/)

### React Router
For front-end declarative routing and navigation, Fridg uses [React Router](https://reactrouter.com).

### React Bootstrap
Styling with React Bootstrap components, check out [React Bootstrap documentation](https://react-bootstrap.github.io).

### Bootstrap
Additional styling and non-React apps, check out [Bootstrap documentation](https://getbootstrap.com)

### Spoonacular API
Check out [Spoonacular API documentation](https://spoonacular.com/food-api) for any and all food related application APIs. They provide a wide range of search engines, nutrition and meal plan APIs, and much more!

### Twilio API
Check out [Twilio API documentation](https://www.twilio.com) for any business communications to embed into web, desktop, and mobile software.

