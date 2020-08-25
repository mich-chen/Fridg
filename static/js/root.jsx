const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Prompt = ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useHistory = ReactRouterDOM.useHistory;
const useLocation = ReactRouterDOM.useLocation;
const useParams = ReactRouterDOM.useParams;



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

  React.useEffect(() => {
    fetch('/api/logout')
    .then(res => res.json())
    .then(data => alert(data.message))
  },[]);

  const handleClick = () => {
    history.push('/')
  }

  return (
    <div>
      Logged out! 

      <button onClick={handleClick}> 
        Click here to go back to home!
      </button>
    </div>
    );
}


function Homepage(props) {
  let history = useHistory();

  const handleClick = () => {
    history.push('create-account')
  };

  return (
    <div id='homepage'>
      <h1> Hello! Welcome to the Homepage! </h1>
      <br></br>

      <Login />
      <br></br>
      
      Don't have an account? Click here to start!
      <button onClick={handleClick}>
        Create New Account!
      </button>
    </div>
    );
}


function Login(props) {
  // set state for email and password
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const loginData = {'email': email, 'password': password};

  const [loggedIn, setLoggedIn] = React.useContext(AuthContext);
  console.log('authcontext', loggedIn);

  const checkLogin = () => { 
    console.log(loginData);
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: { 'Content-Type': 'application/json'},
      credentials:'include'
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      console.log('data', data.success);
      setLoggedIn(data.success)
    })
  };

  console.log(loggedIn);

  // reset form fields after user clicks submit
  const resetForm = () => {
    setEmail('');
    setPassword('')
  };

  // set onChange listener for change in textbox
  return (
   <div name='login'>
    <section className='login-form'>
      <h3> Log in to see your saved recipes! </h3>
      <br></br>

      <label> Email: </label>
        <input id='email'
               type='text'
               onChange={(e) => {setEmail(e.target.value)}}
               value={email} 
               />

      <label> Password: </label>
        <input id='password'
               type='password'
               onChange={(e) => {setPassword(e.target.value)}}
               value={password}
               />

      <br></br>

      <button id='login-btn' 
              onClick={() => {checkLogin(); resetForm()}} 
              >
        Log in
      </button>

    </section>
  </div>
  );
}


function CreateAccount(props) {
  let history = useHistory();
  // state for email and password for new account
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const newAccountData = {'email': email, 'password': password};

  const createAccount = () => {
    fetch('/api/create_account', {
      method: 'POST',
      body: JSON.stringify(newAccountData),
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => alert(data.message))
      .then(history.push('/homepage'))
  };

  // reset form fields after onClick of login button
  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <div name='create-account'>
        <section className='create-account-form'>
          <h3> Create a New Account to start saving recipes! </h3>
          <br></br>

          <label> Email: </label>
            <input id='email'
                   type='text'
                   onChange={(e) => {setEmail(e.target.value)}}
                   value={email} 
                   />

          <label> Password: </label>
            <input id='password'
                   type='password'
                   onChange={(e) => {setPassword(e.target.value)}}
                   value={password}
                   />

          <br></br>

          <button id='create-account-btn' 
                  onClick={() => {createAccount(); resetForm()}} 
                  >
            Create Account
          </button>

        </section>
      </div>
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

  console.log(savedList);

  return (
    <div>
      <section id='saved-recipes'>
        {!savedList.length ? <p>You haven't saved any recipes yet!</p>
          : (savedList.map((recipe) => 
                <RecipeCard key={recipe.recipe_info.recipe_id}
                            recipeDetails={recipe}
                            fromPath={'saved-recipes'}
                            recipeImg={recipe.recipe_info.image}
                            recipeTitle={recipe.recipe_info.title}
                            recipeId={recipe.recipe_info.recipe_id}
                            recipeServings={recipe.recipe_info.servings}
                            recipeTimes={recipe.recipe_times}
                            recipeIngredients={recipe.recipe_ingredients}
                            button={<SavedRecipesButton buttonStatus={recipe.recipe_info.favorite}/>}
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
  console.log('outside resultsList', resultsList);
  // console.log('results list', resultsList);
  // list of saved recipes (will be empty if not logged in or none saved)
  // const savedList = props.savedList;
  // list of results recipes that are not saved
  
  const [checkedRecipes, updateCheckedRecipes] = React.useState([]);

  const [success, updateSuccess] = React.useState(undefined);

  React.useEffect(() => {
    console.log('in searchResults useEffect');
    console.log('resultsList', resultsList);
    fetch('/api/check_results', {
      method: 'POST',
      body: JSON.stringify({results_list: resultsList}),
      headers: { 'Content-Type': 'application/json'},
      credentials:'include'
    })
    .then(res => res.json())
    .then(data => {
      // alert(data.message);
      updateCheckedRecipes(data.checked_recipes);
      updateSuccess(data.success);
    });
  }, [resultsList, success]);


  return (
    <div>
      <section id='search-results'>
        {!props.resultsList.length ? <p>Searching...</p>
          : (checkedRecipes.map((recipe) => 
              <RecipeCard key={recipe.recipe_info.recipe_id}
                          fromPath={success ? 'user-search-results': 'search-results'}
                          recipeDetails={recipe}
                          recipeImg={recipe.recipe_info.image}
                          recipeTitle={recipe.recipe_info.title}
                          recipeId={recipe.recipe_info.recipe_id}
                          recipeServings={recipe.recipe_info.servings}
                          recipeTimes={recipe.recipe_times}
                          recipeIngredients={recipe.recipe_ingredients}
                          button={success ? <SearchResultButton buttonStatus={recipe.is_saved}/>
                          : <StaticButton />
                                     }
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

const AuthContext = React.createContext(null);
// creating instance of context

function App() {
  console.log('in app component');
  // data is from external API after clicking SearchBar button
  const [data, setData] = React.useState([]);
  console.log((data));

  const [loggedIn, setLoggedIn] = React.useState(false);

  const newUser = true;


    // use React Router for front-end routing
    return (
      <AuthContext.Provider value={[loggedIn, setLoggedIn]}>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/homepage">Homepage</Link>
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
              <Route path="/:fromPath/recipe-details/:id" >
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
                <CreateAccount />
              </Route>

              <Route exact path="/logout">
                <Logout />
              </Route>

              <Route exact path="/test-page">
                <TestPage />
              </Route>

              <Route path="/homepage">
                <Homepage />
              </Route>

              <Route exact path="/">
                <Homepage />
              </Route>
            </Switch>
          </div>
        </Router>
    </AuthContext.Provider>
  );
}

// homepage path '/' has to be last or else will render homepage when hits a '/' even if for other path. or specify "exact path" 


// render the function component App
ReactDOM.render(<App />, document.getElementById('root'))