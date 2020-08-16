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
  
  const instructions = props.instructions['instructions'];
  // console.log(instructions);
  const instructionsList = [];
  for (const instruction of instructions) {
    // console.log(instruction);
    instructionsList.push(<RecipeInstructionItem instructions={instruction} />)
  };
  // console.log(instructionsList);

  return (
    <ol>
      {instructionsList}
    </ol>
    );
}


function SaveRecipe(props) {
  // currently not working, still need to work on backend
  console.log('in save recipe component')
  console.log(props);
  console.log(props.recipe_id);

  // onClick, send POST request to server, sending recipe's id, so backend can identify recipe in current session and parse data to store into db
  const saveRecipe = () => {
    console.log('in callback for onClick')
    fetch('/api/save_a_recipe/', {
      method: 'POST',
      body: JSON.stringify({recipe_id: props.recipe_id}),
      headers: { 'Content-Type': 'application/json'},
      credentials:'include'
    }
    .then(res => res.json())
    .then(data => alert(data.success))
    )
  }

  // event handler for click of Save button
  return (
      <button 
      id='save-recipe-btn' 
      onClick={saveRecipe}>
        Save this Recipe
        </button>
    );
}


function RecipeCard(props) {
  // return a div that is a recipe card with recipe's details
  // render detail component with appropriate prop
  // console.log(props.recipe_info);
  // console.log(props.recipe_times);
  // console.log(props.recipe_instructions);
  // console.log(typeof(props.recipe_instructions))
  // console.log(props.recipe_equipment);

  // passing prop's children to new components which are separate parts of recipe card

  return (
    <div>
      <section id='recipe-card'>
        <section id='recipe-img'>
          <RecipeImage image={props.recipe_info['image']} />
        </section>

        <h3>{props.recipe_info['title']}</h3>

        <section id="times-section">
            <RecipeTimeSection time={props.recipe_times} />
        </section>

        <RecipeServings servings={props.recipe_info['servings']} />

        <section id="recipe-instructions">
            <RecipeInstructions instructions={props.recipe_instructions} />
        </section>

        <section id="save-recipe">
          <SaveRecipe recipe_id={props.recipe_info['recipe_id']} />
        </section>

        <a href={`${props.recipe_info['sourceUrl']}`}>For more details on recipe</a>
      </section>
    </div>
    );
}


function SearchResults(props) {
  // take results from server and spoonacular api through prop
  // set state for user's ingredient search, if user were to make a new search within same session
  const [recipeResultsList, setRecipeResultsList] = React.useState([]);
  // does not show 'Loading...' on page..
  console.log('in search results');
  // make post request with user's ingredients input
  // parse data, and pass appropriate data as props to recipe card component
  // console.log(props.recipesList);
  // const {recipe_info, recipe_times, recipe_instructions, recipe_equipment} =


  // passing API's data as prop to new component. But destructuring and parsing the prop into children(?)
  React.useEffect(() => {
    // const recipeCards = [];
    // for (const recipe of props.recipesList) {
    //   // console.log(recipe);
    //   // console.log(recipe['recipe_info']);
    //   recipeCards.push(
    //     <RecipeCard 
    //       recipe_info={recipe['recipe_info']}
    //       recipe_times={recipe['recipe_times']}
    //       recipe_instructions={recipe['recipe_instructions']}
    //       recipe_equipment={recipe['recipe_equipment']} 
    //     />)
    // };
    setRecipeResultsList(props.recipesList)
    //  array of recipe objects
  }, []);
  // dependency is state, do not need to remake recipe cards if user didn't make new search (but...don't know how to work if i'm using offset of results)

  return (
    <div name='recipes'>
      <section id="search-results">
        <ul>
          {!recipeResultsList.length ? 'Loading...' : (recipeResultsList.map((recipe) => <RecipeCard 
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
  // data is from external API after clicking SearchForm button

  // check if data is an object or empty object
  if (Object.keys(data).length !== 0) {
    console.log('in if statement');

    // each recipe's data is an object (with more objects nested with specific details)
    // pushing each recipe into a list so can further iterate to make each recipe card
    const recipesList = [];
    for (const recipe of data) {
      recipesList.push(recipe);
    };
    // console.log(recipesList);

    // pass list of recipe's information to new component as prop
    return (
      <SearchResults recipesList={recipesList}
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
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/test-page">Test</Link>
            </li>
            <li>
              <Link to="/log-out">Log Out</Link>
            </li>
            <li>
              <Link to="create-new-account">Create New Account</Link>
            </li>
          </ul>
          <SearchForm setData={setData}/>
        </nav>

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