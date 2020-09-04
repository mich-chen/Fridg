const { Badge, Button, ButtonGroup, Col, Container, Collapse, Form, FormControl, InputGroup, ListGroup, ToggleButton, ToggleButtonGroup, Modal, Alert, OverlayTrigger, CardColumns, Card, CardDeck, CardGroup, Nav, Navbar, Row, Image } = ReactBootstrap;

const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Prompt = ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useHistory = ReactRouterDOM.useHistory;
const useLocation = ReactRouterDOM.useLocation;
const useParams = ReactRouterDOM.useParams;


function Homepage(props) {
  let history = useHistory();
  const {setMessage, showAlert} = props;

  const {loggedIn} = React.useContext(AuthContext);
  const [appear, setAppear] = React.useState(false);

  const handleClick = () => {
    history.push('create-account')
  };

  return (
    <div id='homepage'>

      <h1> Hello! Welcome to Fridg! </h1>

      <CatchPhrase />

      <SearchBar setData={props.setData}/>
      <br></br>

      <Login setMessage={setMessage} showAlert={showAlert} />
      <br></br>
      
      <div style={{display: (loggedIn ? 'none' : 'block')}}>
        <p>Don't have an account? Click here to start!</p>

        <Button variant='info' onClick={() => {setAppear(!appear)}}>
          Create New Account!
        </Button>

        <Collapse in={appear}>
          <div id='create-account-collapse'>
            <CreateAccount setMessage={setMessage} showAlert={showAlert}/>
          </div>
        </Collapse>
      </div>
    </div>
    );
}


function CatchPhrase(props) {
  return (
    <h4> Fridg. Home to your family of ingredients. Family means no ingredient left behind or forgotten. </h4>
    );
}


function About(props) {
  return (
    <div>
      <p> Fridg is a single-page webapp that curates recipes based on what's in your fridge! Fridg's mission is to help reduce food waste by using Spoonacular's API to search recipes maximizing ingredients you have on hand. If you find a recipe you like, you can save, favorite, and journal your experiences with your saved recipes. Fridg also provides a checklist of missing ingredients when you search recipes and you may customize a grocery shopping list to be sent to your phone. 
      </p>

      <CatchPhrase />
    </div>
    );
}


function SavedRecipes(props) {
  const [savedList, setSavedList] = React.useState([]);
  const [removed, updateRemoved] = React.useState(false);
  // retrieve list of user's saved recipes
  React.useEffect(() => {
    console.log('useeffect in saved recipes');
    fetch('/api/saved_recipes')
    .then(res => res.json())
    .then(savedData => {
      setSavedList(savedData.saved_recipes); 
    })
  }, [removed]);
  // console.log('saved list of recipes', savedList);
  const handleRemove = () => {
    updateRemoved(true);
  };

  return (
    <div className='container'>
      <CardColumns className='card-columns'>
        <section id='saved-recipes'>
          {!savedList.length ? <p>You haven't saved any recipes yet!</p>
            : (savedList.map((recipe) => 
                  <RecipeCard key={recipe.recipe_id}
                              fromPath={'saved-recipes'}
                              recipeDetails={recipe}
                              img={recipe.image}
                              title={recipe.title}
                              recipeId={recipe.recipe_id}
                              servings={recipe.servings}
                              prepMins={recipe.prep_mins}
                              cookMins={recipe.cooking_mins}
                              readyMins={recipe.ready_mins}
                              buttonStatus={recipe.favorite}
                              handleRemove={handleRemove}
                              />
                          ))
          }
        </section>
      </CardColumns>
  </div>
    );
}


function SearchResults(props) {
  // resultsList is data from Spoonacular's API.
  const resultsList = props.resultsList;
  const [checkedRecipes, updateCheckedRecipes] = React.useState([]);
  // check search results for any user's saved recipes
  React.useEffect(() => {
    console.log('in check results use effect');
    fetch('/api/check_results', {
      method: 'POST',
      body: JSON.stringify({results_list: resultsList}),
      headers: { 'Content-Type': 'application/json'},
      credentials:'include'
    })
    .then(res => res.json())
    .then(data => {
      updateCheckedRecipes(data.checked_recipes);
    });
  }, [resultsList]);

  console.log('results', checkedRecipes);


  return (
    <CardColumns className='card-columns'>
      <section id='search-results'>
        {!props.resultsList.length ? <p>Searching...</p>
          : (checkedRecipes.map((recipe) => 
              <RecipeCard key={recipe.recipe_id}
                          fromPath={'search-results'}
                          recipeDetails={recipe}
                          img={recipe.image}
                          title={recipe.title}
                          recipeId={recipe.recipe_id}
                          servings={recipe.servings}
                          prepMins={recipe.prep_mins}
                          cookMins={recipe.cooking_mins}
                          readyMins={recipe.ready_mins}
                          buttonStatus={recipe.is_saved}
                          alertProps={props.alertProps}
                          />
                      ))
        }
      </section>
    </CardColumns>
    );
}


function SearchBar(props) {
  let history = useHistory();
  const [ingredients, setIngredients] = React.useState('');

  const searchRecipes = () => {
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
    <React.Fragment>
      What's in your fridge? 
      <FormControl type='text'
             className='search-bar'
             onChange={(e) => {setIngredients(e.target.value)}}
             value={ingredients}
             placeholder='e.g. beef, potato'>
      </FormControl>

      <Button onClick={searchRecipes} variant='outline-info'>
        Let's get cookin!
        </Button>
    </React.Fragment>
    );
}

// creating instance of context
const AuthContext = React.createContext(null);


function App() {
  console.log('in app component');
  // data from Spoonacular API search results
  const [data, setData] = React.useState([]);
  console.log((data));
  const [loggedIn, setLoggedIn] = React.useState(null);
  // each time setLoggedIn is updated in App, useEffect will fetch logged in from server to persist data during reloads
  React.useEffect(() => {
    console.log('in app useEffect');
    fetch('/api/check_session')
      .then(res => res.json())
      .then(data => setLoggedIn(data.in_session))
  }, [loggedIn]);
  console.log('app loggedIn status', loggedIn);
  // state for handling showing userAuthModal in nav links
  const [show, setShow] = React.useState(false);
  const handleShow = () => {setShow(true)};
  const handleClose = () => {setShow(false)};
  // state for showing alerts for user authentication
  const [alert, showAlert] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const VARIANTS = {
    true: 'success',
    false: 'danger'
  };

  // enum to conditionally render navbar links with loggedIn 
  const NavLinks = {
    true: (<Nav>
              <Nav.Link as={Link} to="/saved-recipes">Saved Recipes</Nav.Link>

              <Nav.Link as={Link} to="/search-results">Search Reults</Nav.Link>

              <Nav.Link as={Link} to="/logout">Log Out</Nav.Link>

          </Nav>
      ),

    false: (<Nav>
                <Nav.Link as={Link} to="/login" onClick={handleShow}>
                  Log In
                </Nav.Link>

                <Nav.Link as={Link} to="/create-account" onClick={handleShow}>Create An Account</Nav.Link>

                <Nav.Link as={Link} to="/search-results">Search Reults</Nav.Link>
          </Nav>
      )
  };

    // use React Router for front-end routing
    return (
      <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
        <Router>
          <div>
            <Navbar bg='dark' variant='dark'>
            <Navbar.Brand> Fridg </Navbar.Brand>
              <Nav>
                  <Nav.Link as={Link} to="/homepage">Homepage</Nav.Link>

                  <Nav.Link as={Link} to="/about">About</Nav.Link>

                  <Nav.Link as={Link} to="/test-page"> Test</Nav.Link>
                
                {NavLinks[loggedIn]}

                <SearchBar setData={setData} />

              </Nav>
            </Navbar>

            <Alert variant={VARIANTS[loggedIn]} show={alert} onClose={() => {showAlert(false)}} dismissible>
              {message}
            </Alert>

            <Switch>

              <Route path="/:fromPath/recipe-details/:id" >
                <RecipeDetails />
              </Route>

              <Route exact path="/saved-recipes">
                <SavedRecipes 
                />
              </Route>

              <Route exact path="/search-results">
                <SearchResults resultsList={data}
                               alertProps={{showAlert, setMessage}} />
              </Route>

              <Route exact path="/login">
                <UserAuthModal show={show}
                               handleClose={handleClose}
                               newUser={false}
                               showAlert={showAlert}
                               setMessage={setMessage} />
              </Route>

              <Route exact path="/create-account">
                <UserAuthModal show={show}
                               handleClose={handleClose}
                               newUser={true}
                               showAlert={showAlert}
                               setMessage={setMessage} />
              </Route>

              <Route exact path="/logout">
                <Logout />
              </Route>

              <Route exact path="/test-page">
                <TestPage />
              </Route>

              <Route exact path="/about">
                <About />
              </Route>

              <Route path="/homepage">
                <Homepage setData={setData}
                          showAlert={showAlert}
                          setMessage={setMessage} />
              </Route>

              <Route exact path="/">
                <Homepage setData={setData}
                          showAlert={showAlert}
                          setMessage={setMessage} />
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