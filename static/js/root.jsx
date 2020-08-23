const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Prompt = ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useHistory = ReactRouterDOM.useHistory;
const useLocation = ReactRouterDOM.useLocation;
const useParams = ReactRouterDOM.useParams;


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


function SavedRecipes(props) {
  const [savedList, setSavedList] = React.useState([]);
  // update state of saved recipes, and pass state as prop to SavedRecipes component
  // const getSavedRecipesList = () => {
  React.useEffect(() => {
    fetch('/api/saved_recipes')
    .then(res => res.json())
    .then(savedData => {
      setSavedList(savedData.saved_recipes); 
    })
  }, []);

  return (
    <div>
      <section id='saved-recipes'>
        {!savedList.length ? 'You haven\'t saved any recipes yet!'
          : (savedList.map((recipe) => 
                <RecipeCard key={recipe.recipe_info.recipe_id}
                            recipeInfo={recipe.recipe_info}
                            recipeTimes={recipe.recipe_times}
                            recipeIngredients={recipe.recipe_ingredients}
                            recipeInstructions={recipe.recipe_instructions}
                            recipeEquipment={recipe.recipe_equipment} 
                            isSaved={true}
                            isFavorite={recipe.recipe_info.favorite}
                            button={<SavedRecipesButton isFavorite={recipe.recipe_info.favorite}/>}
                            />
                        ))
        }
      </section>
    </div>
    );
}


function SearchResults(props) {
  // resultsList is data from App component and Spoonacular's data.
  const resultsList = props.resultsList;
  // console.log('results list', resultsList);
  // list of saved recipes (will be empty if not logged in or none saved)
  // const savedList = props.savedList;
  // list of results recipes that are not saved
  
  const [checkedRecipes, updateCheckedRecipes] = React.useState([]);

  React.useEffect(() => {
    console.log('in searchResults useEffect');
    fetch('/api/check_results', {
      method: 'POST',
      body: JSON.stringify({results_list: resultsList}),
      headers: { 'Content-Type': 'application/json'},
      credentials:'include'
    })
    .then(res => res.json())
    .then(data => {updateCheckedRecipes(data.checked_recipes)});
  }, [resultsList]);

// console.log('checked list', checkedRecipes); 

  return (
    <div>
      <section id='search-results'>
        {!props.resultsList.length ? 'Searching...'
          : (checkedRecipes.map((recipe) => 
              <RecipeCard key={recipe.recipe_info.recipe_id}
                          recipeDetails={recipe}
                          recipeInfo={recipe.recipe_info}
                          recipeTimes={recipe.recipe_times}
                          recipeIngredients={recipe.recipe_ingredients}
                          recipeInstructions={recipe.recipe_instructions}
                          recipeEquipment={recipe.recipe_equipment} 
                          isSaved={recipe.is_saved}
                          isFavorite={false}
                          button={<SearchResultButton isSaved={recipe.is_saved}/>}
                          />
                      ))
        }
      </section>
    </div>
    );
}


function SearchBar(props) {
  let history = useHistory();
  const [ingredients, setIngredients] = React.useState('');
  // console.log(typeof(ingredients));

  const searchRecipes = () => {
    // create javascript object to stringify to server
    
    let data = [];

    fetch('/api/search_results', {
      method: 'POST',
      body: JSON.stringify({ingredients: ingredients}),
      headers: { 'Content-Type': 'application/json'},
      credentials:'include'
    })
    .then((response) => response.json())
    .then((data) => props.setData(data))
    .then(setIngredients(''));

    history.push("/search-results");
  };


  return (
    <div>
      <section className='search-bar'>
        What's in your fridge? 
        <input type='text'
               id='user-search'
               onChange={(e) => {setIngredients(e.target.value)}}
               value={ingredients}>
        </input>

        <button onClick={searchRecipes}>
          Let's get cookin!
          </button>
      </section>
    </div>
    );
}








function App() {
  console.log('in app component');
  // data is from external API after clicking SearchBar button
  const [data, setData] = React.useState([]);
  console.log((data));
  console.log(typeof(data));

  // // set state of user's saved recipes list of objects with recipe details
  // const [savedList, setSavedList] = React.useState([]);
  // // update state of saved recipes, and pass state as prop to SavedRecipes component
  // const getSavedRecipesList = () => {
  //   fetch('/api/saved_recipes')
  //   .then(res => res.json())
  //   .then(savedData => {
  //     setSavedList(savedData.saved_recipes); 
  //   })
  // };

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
              <Link to="/saved-recipes">
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

          <SearchBar 
            setData={setData}
            />

        </nav>

        <Switch>
          <Route path="/recipe-details/:id" >
            <RecipeDetails />
          </Route>

          <Route exact path="/saved-recipes">
            <SavedRecipes 
            />
          </Route>

          <Route exact path="/search-results">
            <SearchResults 
              resultsList={data}
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