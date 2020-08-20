const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Prompt = ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useHistory = ReactRouterDOM.useHistory;


function Homepage() {
  let history = useHistory();
  const handleClick = () => {
    history.push("create-account")
  }

  return (
    <div>
      <h1> Hello! Welcome to the Homepage! </h1>
      <br></br>

      <Login />
      <br></br>
      OR
      <br></br>
      <button onClick={handleClick}>
        Create New Account!
      </button>
    </div>
    );
}


function TestPage() {
  // testing how to call two functions in one onClick

  const [test, setTest] = React.useState(false);

  React.useEffect(() =>{
    test ? console.log('in useEffect, test is true') : console.log('in useEffect, test is false')
    // setTest(true)
    console.log('in useEffect')
  }, [test]);

  const test1 = () => {
    console.log('test1')
  };

  const test2 = () => {
    console.log('test2')
  };


  return (
    <div>
      Test react div

      <button onClick={() => setTest(true)}>
        {test ? 'test is true': 'test is false'}
      </button>
    </div>
  );
}

function Logout() {
  let history = useHistory();
  console.log('in logout component');

  fetch('/api/logout')
  .then(res => res.json())
  .then(data => alert(data.message));

  return (
    <div>
      {history.push("/")}
    </div>
    );
}

function Login(props) {
  // set state for email and password
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // if new user then true, will be prop when rendering from "/create-user" route
  // applies when clicked create account button from homepage
  // or when click create account in navbar
  const newUser = props.newUser;

  const checkLogin = () => {
    // create javascript object to stringify to server
    const loginData = {'email': email, 'password': password};
    console.log(loginData);
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: { 'Content-Type': 'application/json'},
      credentials:'include'
    })
    .then(response => response.json())
    .then(data => alert(data.message))
  };

  const createAccount = () => {
    const newAccountData = {'email': email, 'password': password};
    console.log(newAccountData);
    fetch('/api/create_account', {
      method: 'POST',
      body: JSON.stringify(newAccountData),
      headers: { 'Content-Type': 'application/json'},
      credentials:'include'
    })
    .then(response => response.json())
    .then(data => alert(data.message))
  };

  // reset form fields after user clicks submit
  const resetForm = () => {
    setEmail('');
    setPassword('')
  };

  // set onChange listener for change in textbox
  // update state when change in textbox
  // value of textbox will be the state
  return (
    <div name='login-form'>
      <h3> {newUser ? 'Enter email and password to get started!': 'Log in to see your saved recipes! :)'} </h3>
      Email:
        <input 
        type='text'
        id='email'
        onChange={(e) => {setEmail(e.target.value)}}
        value={email}>
        </input>
      Password:
        <input 
        type='password'
        id='password'
        onChange={(e) => {setPassword(e.target.value)}}
        value={password}>
        </input>
      {newUser ? 
        <button onClick={() => {
          createAccount();
          resetForm()}}>
        Create Account
        </button>
        : 
        <button onClick={() => {
          checkLogin();
          resetForm()}}>
        Log in 
        </button>
      }
    </div>
  );
}


function RecipeImage(props) {
  return (
      <img src={`${props.image}`} id='recipe-img'></img>
    );
}


function RecipeTime(props) {
  return <span>{props.time}</span>;
}


function RecipeTimeSection(props) {
  return (
    <ul>
      <li>
        <label>Prep Time: </label>
        <RecipeTime time={props.time.preparationMinutes} />
      </li>
      <li>
        <label>Cook Time: </label>
        <RecipeTime time={props.time.cookingMinutes} />
      </li>
      <li>
        <label>Ready In: </label>
        <RecipeTime time={props.time.readyInMinutes} />
      </li>
    </ul>
    );
}


function RecipeServings(props) {
  return (
    <div>
      <label>Servings: </label>
      {props.servings}
    </div>
  );
}

function RecipeInstructionItem(props) {
  return <li>{props.instructions}</li>;
}


function RecipeInstructions(props) {
  // list of instructions (in order)
  
  const instructions = props.instructions.instructions;
  // console.log(instructions);
  const instructionsList = [];
  for (const instruction of instructions) {
    // console.log(instruction);
    instructionsList.push(<RecipeInstructionItem key={instructions.indexOf(instruction)} instructions={instruction} />)
  };
  // console.log(instructionsList);

  return (
    <ol>
      {instructionsList}
    </ol>
    );
}


function SaveRecipeButton(props) {
  console.log('in save recipe button component');
  console.log(props.recipe_id);
  // console.log(props.recipe_details);

  let history = useHistory();

  // state for button's text, initial state is passed through props
  // initial state is true if rendering from savedRecipes
  // initial state is fasle if rendering from searchResults
  const [isSavedText, setIsSavedText] = React.useState(props.isSaved);
  console.log(isSavedText);

  // onClick, send POST request to server, sending recipe's id, so backend can identify recipe in current session and parse data to store into db

  const toggleBtnText = () => {
    console.log('in toggleBtnText');
    // update button's state, causing rerender of button, which will change text
    setIsSavedText(true);
  };

  // add recipe to saved recipes table for logged in user
  const saveRecipe = () => {
    console.log('in processing saving recipe')
    fetch('/api/save_a_recipe', {
      method: 'POST',
      body: JSON.stringify({
        recipe_id: props.recipe_id
      }),
      headers: { 'Content-Type': 'application/json'},
      credentials:'include'
    })
    .then(res => res.json())
    .then(data => alert(data.message))
    .then(toggleBtnText())
  };

  // add selected recipe to db (server will check if already stored or new)
  const addRecipe = () => {
    console.log('in callback for onClick for saving recipe')
    fetch('/api/recipe_to_db', {
      method: 'POST',
      body: JSON.stringify({
        recipe_details: props.recipe_details
      }),
      headers: { 'Content-Type': 'application/json'},
      credentials:'include'
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      data.success ? saveRecipe() : history.push("/login")
      // if logged in, proceed to saveRecipe, if not logged in will push to login
    })
  };

  // event handler for click of Save button
  return (
      <button 
      id='save-recipe-btn' 
      onClick={(e) => {addRecipe(e.target.value)}}>
        {props.isFavorite ? 'Favorited <3' 
          : isSavedText ? 'Saved!' 
          : 'Save this recipe!'
        }
      </button>
    );
}


function FavoriteButton(props) {
  console.log('in favorite button component');
  // console.log(props.recipe_id);
  console.log(props.isFavorite);
  const [isFavorite, setIsFavorite] = React.useState(props.isFavorite);
  console.log(isFavorite);

  // React.useEffect(() => {
  //   console.log('in fav button useEffect');
  //   isFavorite ? console.log('isFavorite is true') : setIsFavorite(props.isFavorite)
  // }, [isFavorite]);


  const toggleBtnText = () => {
    setIsFavorite(true);
  };

  const favoriteThisRecipe = () => {
    console.log('in adding favorite component to server');
    fetch('/api/favorite_a_recipe', {
      method: 'POST',
      body: JSON.stringify({
        recipe_id: props.recipe_id
      }),
      headers: { 'Content-Type': 'application/json'},
      credentials:'include'
    })
    .then(res => res.json())
    .then(data => alert(data.message))
    .then(setIsFavorite(true))
  };

  return (
    <button 
    id='favorite-btn' 
    onClick={favoriteThisRecipe}>
      {isFavorite ? 'Favorite <3' : 'Saved! Not Favorited'}
    </button>
    );
}


function RecipeCard(props) {
  // return a div that is a recipe card with recipe's details
  // render detail component with appropriate prop
  // passing prop's children to new components which are separate parts of recipe card
  console.log('in recipeCard component')
  // console.log(props.savedListIds);
  // console.log(props.favoriteListIds);

  const [isSaved, setIsSaved] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  // console.log(isFavorite);

  // let isSaved = false;
  // let isFavorite = false;
  React.useEffect(() => {
    console.log('in use Effect of recipe card');
    // console.log(props.recipe_info.recipe_id);
    console.log(props.favoriteListIds);
    if (props.favoriteListIds.includes(props.recipe_info.recipe_id)) {
      console.log('in recipe card, setting isFavorite');
      setIsFavorite(true);
    };

    if (props.savedListIds.includes(props.recipe_info.recipe_id)) {
      console.log('in recipe card, setting isSaved')
      setIsSaved(true)
    };
  }, [isSaved, isFavorite]);


  return (
    <div>
      <section id='recipe-card'>
        <section id='recipe-img'>
          <RecipeImage image={props.recipe_info.image} />
        </section>

        <h3>{props.recipe_info['title']}</h3>

        <section id="times-section">
            <RecipeTimeSection time={props.recipe_times} />
        </section>

        <RecipeServings servings={props.recipe_info.servings} />

        <section id="recipe-instructions">
            <RecipeInstructions instructions={props.recipe_instructions} />
        </section>

        <section id="save-button">
          {
            props.renderingFrom === 'SavedRecipes'
            ? <FavoriteButton 
                recipe_id={props.recipe_info.recipe_id} 
                recipe_details={props}
                isFavorite={isFavorite}
              />
            : <SaveRecipeButton 
                recipe_id={props.recipe_info.recipe_id} 
                recipe_details={props}
                isSaved={isSaved}
                isFavorite={isFavorite}
              />
          }
        </section>

        <a href={`${props.recipe_info.sourceUrl}`}>For more details on recipe</a>
      </section>
    </div>
    );
}


function SavedRecipes(props) {
  console.log('in SavedRecipes component');
  // console.log(props.savedList);

  // console.log(props.savedList);
  // console.log(props.favoriteListIds);

  const savedListIds = []
  props.savedList.map((recipe) => {savedListIds.push(recipe.recipe_info.recipe_id)}
  )

  // if user doesn't have any saved recipes yet, render text
  // else, render user's saved recipe cards
  return (
      <div>
        <section id="saved-recipes">
          <ul>
            {!props.savedList.length 
              ? 'You haven\'t saved any recipes yet!' 
              : (props.savedList.map((recipe) => <RecipeCard 
                  key={recipe.recipe_info.recipe_id}
                  recipe_info={recipe.recipe_info}
                  recipe_times={recipe.recipe_times}
                  recipe_instructions={recipe.recipe_instructions}
                  recipe_equipment={recipe.recipe_equipment}
                  renderingFrom={'SavedRecipes'}
                  savedListIds={savedListIds}
                  favoriteListIds={props.favoriteListIds}
          />)) 
          }
          </ul>
        </section>
      </div>
      );
}


function SearchResults(props) {
  // take results from server and spoonacular api through props
  // parse data, and pass appropriate data as props to recipe card component
  console.log('in search results');
  
  // // state of user's saved recipes list is passed as props.savedList
  // console.log(props.savedList);
  // console.log(props.favoriteListIds);

  const savedListIds = []
  props.savedList.map((recipe) => {savedListIds.push(recipe.recipe_info.recipe_id)}
  )

  return (
    <div>
      <section id="search-results">
        <ul>
          {!props.recipesList.length 
            ? 'Searching...' 
            : (props.recipesList.map((recipe) => <RecipeCard 
              key={recipe.recipe_info.recipe_id}
              recipe_info={recipe.recipe_info}
              recipe_times={recipe.recipe_times}
              recipe_instructions={recipe.recipe_instructions}
              recipe_equipment={recipe.recipe_equipment} 
              renderingFrom={'SearchResults'}
              savedListIds={savedListIds}
              favoriteListIds={props.favoriteListIds}
        />)) 
        }
        </ul>
      </section>
    </div>
    );
}


function SearchForm(props) {
  let history = useHistory();
  const [ingredients, setIngredients] = React.useState('');

  // call function to get saved and favorited recipes and updates state in App component
  const checkSavedFavoriteRecipes = () => {
    console.log('in check saved and favorite recipes function')
    props.getSavedFavoritedRecipes();
  };

  const searchRecipes = () => {
    // create javascript object to stringify to server
    // console.log(ingredients)
    fetch('/api/search_results', {
      method: 'POST',
      body: JSON.stringify({ingredients: ingredients}),
      headers: { 'Content-Type': 'application/json'},
      credentials:'include'
    })
    .then((response) => response.json())
    .then((data) => props.setData(data))
    .then(setIngredients(''));

    history.push("/search-results")
  };

  // set onChange listener for change in textbox
  // update ingredient state with value in textbox (string)
  return (
    <div name='search-form'>
        What's in your fridge? 
        <input type='text'
               id='user-ingredients'
               onChange={(e) => {setIngredients(e.target.value)}}
               value={ingredients}>
        </input>

        <button onClick={() => {searchRecipes(); checkSavedFavoriteRecipes()}}>
          Let's get cookin!
          </button>
    </div>
    );
}



function App() {
  console.log('in app component');
  // data is from external API after clicking SearchForm button
  const [data, setData] = React.useState({});
  console.log(data);

  // set state of user's saved recipes list of objects with recipe details
  const [savedList, setSavedList] = React.useState([]);
  // set state of favorites list of favorited recipe's ids
  const [favoriteListIds, setFavoriteListIds] = React.useState([]);
  // update state of saved recipes, and pass state as prop to SavedRecipes component
  const getSavedFavoritedRecipes = () => {
    fetch('/api/get_saved_and_fav_recipes')
    .then(res => res.json())
    .then(savedData => {
      setSavedList(savedData.saved_recipes); 
      console.log(savedList.length);
      setFavoriteListIds(savedData.favorited_list);
      console.log(savedData.favorited_list)
    })
  };

  const newUser = true;


    // use React Router for front-end routing
    return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
            <Link to="/">Homepage</Link>
            </li>

            <li>
              <Link to="/login">Log In</Link>
            </li>

            <li>
              <Link to="/create-account">Create An Account</Link>
            </li>

            <li> 
              <Link to="/search-results">Search Reults</Link>
            </li>

            <li> 
              <Link 
                to="/saved-recipes" 
                onClick={getSavedFavoritedRecipes}
              >
                Saved Recipes
              </Link>
            </li>

            <li>
              <Link to="/test-page">Test</Link>
            </li>

            <li>
              <Link to="/logout">Log Out</Link>
            </li>
          </ul>

          <SearchForm 
            setData={setData}
            getSavedFavoritedRecipes={getSavedFavoritedRecipes}
            />

        </nav>

        <Switch>
          <Route exact path="/saved-recipes">
            <SavedRecipes 
              savedList={savedList}
              favoriteListIds={favoriteListIds}
            />
          </Route>

          <Route exact path="/search-results">
            <SearchResults 
              recipesList={data}
              savedList={savedList}
              favoriteListIds={favoriteListIds}
            />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/create-account">
            <Login newUser={newUser} />
          </Route>

          <Route exact path="/logout">
            <Logout />
          </Route>

          <Route exact path="/test-page">
            <TestPage />
          </Route>

          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// homepage path '/' has to be last or else will render homepage when hits a '/' even if for other path. or specify "exact path" 


// render the function component App
ReactDOM.render(<App />, document.getElementById('root'))