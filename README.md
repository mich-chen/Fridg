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


### Searching Recipes by Ingredients
When users or guests search ingredients they have on hand, an asynchronous fetch request is made to my backend and Spoonacular's API to return recipes maximizing the queried ingredients.


Using a RESTful API on Fridg's backend, search results are checked for any previously saved recipes and conditionally renders buttons accordingly.


### Recipe Details From Search Results - Missing Ingredients
Spoonacular's data includes missing ingredients which users may send as a shopping list to their phone via the Twilio API.



### Recipe Details From Saved Recipes - Food For Thoughts
Logged in users will see a section called Food For Thoughts and no longer see missing ingredients. Fridg uses React hooks, such as useContext, useState, and useEffect, to conditionally render this section depending if user accessed recipe details from Saved or Search Results. 

useContext provides global access to user authentication for also conditionally rendering navlinks and setting state for saved recipes. useState and useEffect are used in combination to set and update state depending where the user came from, and to render appropriate section in details.


### Food For Thoughts
Food For Thoughts 


### Removing Recipe From Saved




## <a name="future"></a>Future State
The project roadmap for Fridg has several features planned out for the next spring:

* Incorporate password encryption and hashing
  * later OAuth for stricter security and login options
* Add social aspect to webapp
  * Add friend list
  * Users can share and have access to others' saved recipes
* Add sorting and filters in search results for time, maximum/minimum ingredients, food group, etc.
  * or add sorting options as dropdown menu in search bar
* Image processing with Spoonacular's API to search recipes based on food or ingredients identified in a photo
* Built-in unit conversions for recipe ingredients


## <a name="installation"></a>Installation

