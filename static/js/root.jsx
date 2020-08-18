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
  return <div>Test react div</div>;
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

  // boolean, if new user then true
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
  console.log('in save recipe component');
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
    setisSavedText(true);
  };

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
    })
  };

  // event handler for click of Save button
  return (
      <button 
      id='save-recipe-btn' 
      onClick={(e) => {addRecipe(e.target.value)}}>
        {!isSavedText ? 'Save this Recipe' : 'Saved!'}
      </button>
    );
}


function FavoriteButton(props) {
  console.log('in favorite button component');

  const [isFavorite, setIsFavorite] = React.useState(false);

  const toggleBtnText = () => {
    setIsFavorite(true);
  }

  return (
    <button 
    id='favorite-btn' 
    onClick={toggleBtnText}>
      {isFavorite ? 'favorite <3' : 'Saved!'}
    </button>
    );
}


function RecipeCard(props) {
  // return a div that is a recipe card with recipe's details
  // render detail component with appropriate prop
  // passing prop's children to new components which are separate parts of recipe card

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
            isSaved={props.isSaved}
            />
            : <SaveRecipeButton 
            recipe_id={props.recipe_info.recipe_id} 
            recipe_details={props}
            isSaved={props.isSaved}
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

  // if user doesn't have any saved recipes yet, render text
  // else, render user's saved recipe cards
  return (
      <div>
        <section id="saved-recipes">
          <ul>
            {!props.savedList.length ? 'You haven\'t saved any recipes yet!' : (props.savedList.map((recipe) => <RecipeCard 
              key={recipe.recipe_info.recipe_id}
              recipe_info={recipe.recipe_info}
              recipe_times={recipe.recipe_times}
              recipe_instructions={recipe.recipe_instructions}
              recipe_equipment={recipe.recipe_equipment}
              renderingFrom={'SavedRecipes'}
              isSaved={true}
          />)) 
          }
          </ul>
        </section>
      </div>
      );
}


function SearchResults(props) {
  // take results from server and spoonacular api through props
  console.log('in search results');
  // parse data, and pass appropriate data as props to recipe card component

  return (
    <div>
      <section id="search-results">
        <ul>
          {!props.recipesList.length ? 'Searching...' : (props.recipesList.map((recipe) => <RecipeCard 
            key={recipe.recipe_info.recipe_id}
            recipe_info={recipe.recipe_info}
            recipe_times={recipe.recipe_times}
            recipe_instructions={recipe.recipe_instructions}
            recipe_equipment={recipe.recipe_equipment} 
            renderingFrom={'SearchResults'}
            isSaved={false}
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

        <button onClick={searchRecipes}>
          Let's get cookin!
          </button>
    </div>
    );
}







function App() {

  // set state for user's ingredient search
  // const [ingredients, setIngredients] = React.useState('');
  const [data, setData] = React.useState({});
  // data is from external API after clicking SearchForm button
  console.log(data);
  console.log('in app component');


  // set state of user's saved recipes list
  const [savedList, setSavedList] = React.useState([]);
  // when user clicks "saved recipes" link, calls function to fetch data
  // update state of saved recipes, and pass state as prop to SavedRecipes component
  const retrieveSavedRecipes = () => {
    fetch('/api/show_saved_recipes')
    .then(res => res.json())
    .then(data => {setSavedList(data); console.log(savedList.length)});
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
              onClick={retrieveSavedRecipes}
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

          <SearchForm setData={setData}/>

        </nav>

        <Switch>
          <Route exact path="/saved-recipes">
            <SavedRecipes 
            savedList={savedList}
            />
          </Route>

          <Route exact path="/search-results">
            <SearchResults 
            recipesList={data} />
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