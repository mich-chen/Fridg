const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Prompt = ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useHistory = ReactRouterDOM.useHistory;


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


function SaveRecipe(props) {
  console.log('in save recipe component')
  // console.log(props);
  console.log(props.recipe_id);
  console.log(props.recipe_details);

  // onClick, send POST request to server, sending recipe's id, so backend can identify recipe in current session and parse data to store into db
  const saveRecipe = () => {
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
    .then(data => alert(data.message))
  };

  // event handler for click of Save button
  return (
      <button 
      id='save-recipe-btn' 
      onClick={(e) => {saveRecipe(e.target.value)}}>
        Save this Recipe
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
          <SaveRecipe 
            recipe_id={props.recipe_info.recipe_id} 
            recipe_details={props} 
            />
        </section>

        <a href={`${props.recipe_info.sourceUrl}`}>For more details on recipe</a>
      </section>
    </div>
    );
}


function SearchResults(props) {
  // take results from server and spoonacular api through props
  console.log('in search results');
  // parse data, and pass appropriate data as props to recipe card component

  return (
    <div name='recipes'>
      <section id="search-results">
        <ul>
          {!props.recipesList.length ? 'Searching...' : (props.recipesList.map((recipe) => <RecipeCard 
            key={recipe.recipe_info.recipe_id}
            recipe_info={recipe.recipe_info}
            recipe_times={recipe.recipe_times}
            recipe_instructions={recipe.recipe_instructions}
            recipe_equipment={recipe.recipe_equipment} 
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

  // // check if data is an object or empty object
  // if (Object.keys(data).length !== 0) {
  //   console.log('in if statement');
  //   console.log(data);

  //   // each recipe's data is an object (with more objects nested with specific details)
  //   // pushing each recipe into a list so can further iterate to make each recipe card
  //   const recipesList = [];
  //   for (const recipe of data) {
  //     recipesList.push(recipe);
  //   };
  //   // console.log(recipesList);

  //   // pass list of recipe's information to new component as prop
  //   return (
  //     <SearchResults recipesList={recipesList}
  //     />);
  
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
              <Link to="/login">Log In</Link>
            </li>
            <li> 
              <Link to="/search-results">Search Reults</Link>
            </li>
            <li>
              <Link to="/test-page">Test</Link>
            </li>
            <li>
              <Link to="/log-out">Log Out</Link>
            </li>
          </ul>
          <SearchForm setData={setData}/>
        </nav>

        <Switch>
          <Route exact path="/search-results">
            <SearchResults recipesList={data} />
          </Route>
          <Route exact path="/login">
            <Login />
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