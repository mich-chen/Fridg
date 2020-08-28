const { Badge, Button, Col, Container, Form, FormControl, InputGroup, ListGroup, Navbar, Row, Table, Modal } = ReactBootstrap;

const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Prompt = ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useHistory = ReactRouterDOM.useHistory;
const useLocation = ReactRouterDOM.useLocation;
const useParams = ReactRouterDOM.useParams;



function TestComponent() {
  return(
    <div>test component div</div>
    );
}


function TestPage() {
  // test component for javascript and react
  const [test, setTest] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [show, setShow] = React.useState(false);

  const handleShow = () => {setShow(true)}
  const handleClose = () => {setShow(false)}

  const testModal = () => {
    console.log('handled Saved Changes modal button');
  };

  console.log('test email', email);

  React.useEffect(() =>{
    test ? console.log('in useEffect, test is true') : console.log('in useEffect, test is false')
    // setTest(true)
    console.log('in useEffect')
  }, [test]);

  const test3 = () => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      console.log('confirmation alert yes');
      // document.getElementById('test-delete').remove()
      document.getElementById('test-delete').innerHTML = 'new text'
    }
  };

  const test4 = (e) => {
    e.preventDefault();
    console.log('prevented default')
  };

  const [checked, setChecked] = React.useState(false);
  const handleCheck = (e) => {
    // used stopPropagation instead of preventDefault to allow button to be checked on one click
    e.stopPropagation();
    // setChecked(e.target.checked);
    document.getElementById('test-checkbox').checked = true;
  };
  console.log(checked ? 'yes checked' : 'no check');


  return (
    <div>
      Test react div

      <Button variant='primary' onClick={handleShow}>
        Launch test modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
          text in modal header? 
        </Modal.Header>

        <Modal.Body>
          <TestComponent />
        </Modal.Body>

        <Modal.Footer>
          text in footer
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>

          <Button variant='primary' onClick={() => {handleClose(); testModal()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>





      <Form>
        <Form.Group controlId='testForm.ControlEmail'>
          <Form.Label> Test input type=email</Form.Label>
          <FormControl type='email' 
                        palceholder='email@email.com'
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        />

          <Button onClick={test4}>
            {test ? 'test is true': 'test is false'}
          </Button>

          <p id='test-delete'> Test text to delete </p>
        </Form.Group>
      </Form>

      <br />

      <h3> Currently missing ingredients </h3>
      <br />

      <Form>
        <Form.Group controlId='testForm.ControlCheckbox'>
          <Form.Label>Test check box </Form.Label>
          <InputGroup.Checkbox id='test-checkbox'
                 type='checkbox'
                 checked={false}
                 onChange={handleCheck} />
          <Form.Label htmlFor='ingredient-id'> Ingredient name </Form.Label>
        </Form.Group>
      </Form>
    </div>
  );
}


function Homepage(props) {
  let history = useHistory();

  const {loggedIn} = React.useContext(AuthContext);
  console.log(loggedIn);

  const handleClick = () => {
    history.push('create-account')
  };

  return (
    <div id='homepage'>
      <h1> Hello! Welcome to the Homepage! </h1>

      <SearchBar setData={props.setData}/>
      <br></br>

      <Login />
      <br></br>
      
      <div style={{display: (loggedIn ? 'none' : 'block')}}>
        <p>Don't have an account? Click here to start!</p>

        <button onClick={handleClick}>
          Create New Account!
        </button>
      </div>
    </div>
    );
}


function SavedRecipes(props) {
  // user's list of saved recipes
  const [savedList, setSavedList] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/saved_recipes')
    .then(res => res.json())
    .then(savedData => {
      setSavedList(savedData.saved_recipes); 
    })
  }, []);

  console.log('saved list of recipes', savedList);

  return (
    <div>
      <section id='saved-recipes'>
        {!savedList.length ? <p>You haven't saved any recipes yet!</p>
          : (savedList.map((recipe) => 
                <RecipeCard key={recipe.recipe_info.recipe_id}
                            fromPath={'saved-recipes'}
                            recipeDetails={recipe}
                            recipeImg={recipe.recipe_info.image}
                            recipeTitle={recipe.recipe_info.title}
                            recipeId={recipe.recipe_info.recipe_id}
                            recipeServings={recipe.recipe_info.servings}
                            recipeTimes={recipe.recipe_times}
                            buttonStatus={recipe.recipe_info.favorite}
                            />
                        ))
        }
      </section>
    </div>
    );
}


function SearchResults(props) {
  // resultsList is data from Spoonacular's API.
  const resultsList = props.resultsList;
  console.log('outside resultsList', resultsList);
  // check search results for any user's saved recipes
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
                          fromPath={'search-results'}
                          recipeDetails={recipe}
                          recipeImg={recipe.recipe_info.image}
                          recipeTitle={recipe.recipe_info.title}
                          recipeId={recipe.recipe_info.recipe_id}
                          recipeServings={recipe.recipe_info.servings}
                          recipeTimes={recipe.recipe_times}
                          buttonStatus={recipe.is_saved}
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
    <div>
      <section className='search-bar'>
        What's in your fridge? 
        <input type='text'
               className='user-search'
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
  // data from external API
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

  // enum to conditionally render navbar links with loggedIn 
  const NavLinks = {
    true: (<nav>
            <li> 
              <Link to="/saved-recipes">Saved Recipes</Link>
            </li>
            <li> 
              <Link to="/search-results">Search Reults</Link>
            </li>
            <li>
              <Link to="/logout">Log Out</Link>
            </li>
          </nav>
      ),

    false: (<nav>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/create-account">Create An Account</Link>
              </li>
              <li> 
                <Link to="/search-results">Search Reults</Link>
              </li>
          </nav>
      )
  };

    // use React Router for front-end routing
    return (
      <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/homepage">Homepage</Link>
                </li>

                <li>
                  <Link to="/test-page">Test</Link>
                </li>
                
                {NavLinks[loggedIn]}

                <SearchBar 
                  setData={setData}
                  />

              </ul>



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
                <Homepage setData={setData}/>
              </Route>

              <Route exact path="/">
                <Homepage setData={setData}/>
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