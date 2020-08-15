const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Prompt = ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;


function Homepage() {
  return <h1> Hello! Welcome to the Homepage! </h1>;
}


function TestPage() {
  return <div>Test react div</div>;
}



function Login() {
  // set state for email and password
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const checkLogin = () => {
    // create javascript object to stringify to server
    const loginData = {'email': email, 'password': password}
    console.log(loginData)
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
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
      Email:
        <input type='text'
        id='email'
        onChange={(e) => {setEmail(e.target.value)}}
        value={email}>
        </input>
      Password:
        <input type='text'
        id='password'
        onChange={(e) => {setPassword(e.target.value)}}
        value={password}>
        </input>
      <button onClick={() => {
          checkLogin();
          resetForm()}}>
        Submit 
        </button>
    </div>
  );
}


function RecipeImage(props) {
  return (
      <img src={`${props.image}`} id='recipe-img'></img>
    );
}


function RecipeTime(props) {
  return <li>{props.time}</li>;
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


function RecipeInstructions(props) {
  // list of instructions (in order)
  const instructions = props.instructions;

  return (
    <li>{instructions}</li>
    );
}


function SaveRecipe(props) {
  return (
    <button>Save this Recipe</button>
    );
}


function RecipeCard(props) {
  // return a div that is a recipe card with recipe's details
  // render detail component with appropriate prop
  const {recipe_info, recipe_times, recipe_instructions, recipe_equipments} = props.recipe;

  return (
    <div name='recipe-card'>
      <section id='recipe-card'>
        <RecipeImage image={recipe_info.image} />

        <h3>{props.recipe_info.title}</h3>

        <section id="times-section">
            <RecipeTimeSection time={recipe_times} />
        </section>

        <RecipeServings servings={recipe_info.servings} />

        <section id="recipe-instructions">
          <ol>
            <RecipeInstructions instructions={recipe_instructions} />
          </ol>
        </section>

        <section id="save-recipe">
          <SaveRecipe recipe_id={recipe_info.recipe_id} />
        </section>

        <a href={`${recipe_info.sourceUrl}`}></a>
      </section>
    </div>
    );
}


function SearchResults(props) {
  // take results from server and spoonacular api through prop
  // set state for user's ingredient search
  const [recipeResultsList, setRecipeResultsList] = React.useState(['Loading...']);
  console.log('in search results');
  // make post request with user's ingredients input
  // parse data, and pass appropriate data as props to recipe card component
  React.useEffect(() => {
    const recipeCards = [];
    for (const recipe in props.recipe_info) {
      recipeCards.push(
        <RecipeCard 
          recipe_info={recipe_info}
          recipe_times={recipe_times}
          recipe_instructions={recipe_instructions}
          recipe_equipments={recipe_equipments} 
        />)
    };
    setRecipeResultsList(recipeCards)
  }, []);

  return (
    <div name='recipes'>
      <section id="search-results">
        <ul>
          {recipeResultsList}
        </ul>
      </section>
    </div>
    );
}


function SearchForm(props) {
  const [ingredients, setIngredients] = React.useState('');

  const searchRecipes = () => {
    // create javascript object to stringify to server
    console.log(ingredients)
    fetch('/api/search_results', {
      method: 'POST',
      body: JSON.stringify({ingredients: ingredients}),
      headers: { 'Content-Type': 'application/json'},
      credentials:'include'
    })
    .then((response) => response.json())
    .then((data) => props.setData(data))
    .then(setIngredients(''))
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
  console.log(data);
  // console.log(Object.keys(data).length);

  const {recipe_info, recipe_times, recipe_instructions, recipe_equipments} = data;

  if (data.hasOwnProperty('recipe_info')) {
    console.log('in if statement');
    return (
      <SearchResults 
      recipe_info={recipe_info}
      recipe_times={recipe_times}
      recipe_instructions={recipe_instructions}
      recipe_equipments={recipe_equipments}
      />);
  };
  // React.useEffect(() => {
  //   console.log('in useEffect');
  //   <SearchResults recipes={data} />
  // }, []);

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
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/test-page">Test</Link>
            </li>
          </ul>
        </nav>
        <SearchForm setData={setData}/>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/test-page">
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