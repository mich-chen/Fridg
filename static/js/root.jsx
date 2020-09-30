const { Button, ButtonGroup, Col, Container, Collapse, Form, FormControl, InputGroup, ToggleButton, Modal, Alert, CardColumns, Card, CardDeck, CardGroup, Nav, Navbar, Row, Image } = ReactBootstrap;

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
    <Container>
      <Row>
        <Col className='homepage logo'>
        <img src='https://img.icons8.com/cotton/64/000000/fridge.png'
                     width='60'
                     height='60'
                     className='fridg-logo d-inline-block' />
        <h1>Fridg </h1>
        <br />
        <h4>No ingredient left behind</h4>
        </Col>
      </Row>
      <Row>
        <Col className='homepage-title homepage'>
          <h1 className='homepage-title'> Welcome! What's in your fridg? </h1>
        </Col>
        </Row>

        <Row>
          <Col className='homepage-search homepage'>
          <SearchBar setData={props.setData}/>
          </Col>
        <br></br>
      </Row>

      <Row className='user-auth-row'>
        <Col className='login-col homepage'>
          <Login setMessage={setMessage} showAlert={showAlert} />

          <div className='homepage-create-account homepage' style={{display: (loggedIn ? 'none' : 'block')}}>

            Don't have an account?
            <br/>
            <Button onClick={() => {setAppear(!appear)}}>
              Create New Account!
            </Button>

            <Collapse in={appear}>
              <div className='create-account-collapse'>
                <CreateAccount setMessage={setMessage} showAlert={showAlert}/>
              </div>
            </Collapse>

          </div>
        </Col>
      </Row>
    </Container>
    );
}


function TagLine(props) {
  return (
    <h5 className='tagline'> 
      <img src='https://img.icons8.com/cotton/64/000000/fridge.png'
           width='35'
           height='35' />
      {' '}Home to your family of ingredients. Family means no ingredient left behind or forgotten. </h5>
    );
}


function About(props) {
  return (
    <Container>
      <Row>
        <Col className='about logo'>
        <img src='https://img.icons8.com/cotton/64/000000/fridge.png'
                     width='60'
                     height='60'
                     className='fridg-logo d-inline-block' />
        <h1>Fridg </h1>
        </Col>
      </Row>

      <Row className='about'>
        <Row className='me-img'>
          <Col className='about me-img'>
            <Row>
              <Col>
              <img src='/static/img/me.jpg' style={{width: 350}}/>
              </Col>
            </Row>
            <Row className='contact'>
              <img src="https://img.icons8.com/cotton/64/000000/secured-letter--v3.png"
                    height='30'
                    width='30' />
                {'    '}mich.chen.94@gmail.com
            </Row>
            <Row className='contact'>
              <img src="/static/img/LinkedIn-logo.png"
                    height='30'
                    width='30' />
                 {'    '}in/mich-chen
            </Row>
            <Row className='contact'>
              <img src="/static/img/GitHub-logo.png"
                                height='30'
                                width='30' /> 
                  {'    '}/mich-chen
            </Row>
          </Col>
        </Row>

        <Col className='about me'>
          <p>
            Hi! Welcome to Fridg! My name is Michelle Chen and I’m a new software engineer. My inspiration for Fridg came from my new cooking experiences during COVID-19 quarantine. I found myself with a few too little ingredients left over from my meal preps and couldn’t find recipes for them. I strive to reduce food waste as much as possible but found my leftover ingredients going bad fairly quickly without a recipe for them to call home. I thought to myself, “I really wish there was an app that could find recipes for ingredients I have on hand…hmm” Luckily, I decided to switch careers at the start of the pandemic and had this amazing opportunity to make the app I was looking for! I’d love to share this app with you in hopes you’ll find delicious simple recipes for your ingredients too! 
          </p>
        </Col>
      </Row>

      <Row>
        <Col className='about' style={{'margin-top': 0}}>
          <p> 
            Fridg is a full-stack, single-page webapp that curates recipes based on what's in your fridge! Fridg's mission is to help reduce food waste by using Spoonacular's API to provide recipes maximizing ingredients you have on hand. If you find a recipe you like, you can save, favorite, and journal your experiences with that recipe. Fridg also provides a checklist of missing ingredients when you search recipes and you may customize a grocery shopping list to be sent to your phone. 
            </p>
        </Col>
      </Row>
    </Container>
    );
}


function SavedRecipes(props) {
  const [savedList, setSavedList] = React.useState([]);
  const [removed, updateRemoved] = React.useState(false);
  // retrieve list of user's saved recipes
  React.useEffect(() => {
    fetch('/api/saved_recipes')
    .then(res => res.json())
    .then(savedData => {
      setSavedList(savedData.saved_recipes); 
    })
  }, [removed]);
  const handleRemove = () => {
    updateRemoved(true);
  };

  return (
    <div className='container saved-recipes'>
      <CardDeck className='card-deck saved-recipes'>
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
      </CardDeck>
  </div>
    );
}


function SearchResults(props) {
  // resultsList is data from Spoonacular's API.
  const resultsList = props.resultsList;
  const [checkedRecipes, updateCheckedRecipes] = React.useState([]);
  // check search results for any user's saved recipes
  React.useEffect(() => {
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

  return (
    <div className='container search-results'>
      <CardDeck className='card-deck search-results'>
          {!props.resultsList.length ? <h4>Let's find recipes for your ingredients!</h4>
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
      </CardDeck>
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
  // Enter key is 13, trigger searchRecipes function if enter key triggered.
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      searchRecipes()
    }
  }

  return (
    <div className='search-bar'>
      <FormControl type='text'
             className='search-bar'
             onChange={(e) => {setIngredients(e.target.value)}}
             value={ingredients}
             placeholder='e.g. beef, potato'
             onKeyUp={handleKeyUp}>
      </FormControl>

      <Button type='submit' className='search-btn' onClick={searchRecipes} >
        Let's get cookin!
      </Button>
    </div>
    );
}

// creating instance of context
const AuthContext = React.createContext(null);


function App() {
  // data from Spoonacular API search results
  const [data, setData] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(null);
  // each time setLoggedIn is updated in App, useEffect will fetch logged in from server to persist data during reloads
  React.useEffect(() => {
    fetch('/api/check_session')
      .then(res => res.json())
      .then(data => setLoggedIn(data.in_session))
  }, [loggedIn]);
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
              <Nav.Link as={Link} to="/saved-recipes">Saved</Nav.Link>

              <Nav.Link as={Link} to="/search-results">Search Results</Nav.Link>

              <Nav.Link as={Link} to="/logout">Log Out</Nav.Link>

          </Nav>
      ),

    false: (<Nav>
                <Nav.Link as={Link} to="/login" onClick={handleShow}>Login</Nav.Link>

                <Nav.Link as={Link} to="/create-account" onClick={handleShow}>New User</Nav.Link>

                <Nav.Link as={Link} to="/search-results">Search Results</Nav.Link>
          </Nav>
      )
  };

    // use React Router for front-end routing
    return (
      <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
        <Router>
          <div className='content-wrapper'>
            <Navbar>
              <Navbar.Brand as={Link} to="/homepage">
                <img src='https://img.icons8.com/cotton/64/000000/fridge.png'
                     width='35'
                     height='35'
                     className='d-inline-block align-top'
                     id='fridg-logo' />
                {'   '} Fridg 
              </Navbar.Brand>
              <Nav>
                <Nav.Link as={Link} to="/homepage">Home</Nav.Link>

                <Nav.Link as={Link} to="/about">About</Nav.Link>
                
                {NavLinks[loggedIn]}

                <Nav className='navbar-search'>
                  <SearchBar setData={setData} />
                </Nav>
              </Nav>
            </Navbar>

            <Alert variant={VARIANTS[loggedIn]} show={alert} onClose={() => {showAlert(false)}} dismissible>
              {message}
            </Alert>

            <Switch>

              <Route path="/:fromPath/recipe-details/:id" >
                <RecipeDetails alertProps={{showAlert, setMessage}}/>
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

          <footer className='tagline footer'>
            <TagLine />
          </footer>
        </Router>
    </AuthContext.Provider>
  );
}

// homepage path '/' has to be last or else will render homepage when hits a '/' even if for other path. or specify "exact path" 


// render the function component App
ReactDOM.render(<App />, document.getElementById('root'))