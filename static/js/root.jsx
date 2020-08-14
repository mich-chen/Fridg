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
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

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

  // set onChange listener for change in textbox
  // update state when change in textbox
  // value of textbox will be the state
  return (
    <div>
      Email:
        <input type="text"
        id="email"
        onChange={(e) => {setEmail(e.target.value)}}
        value={email}>
        </input>
      Password:
        <input type="text"
        id="password"
        onChange={(e) => {setPassword(e.target.value)}}
        value={password}>
        </input>
      <button onClick={checkLogin}> Submit </button>
    </div>
  );
}


// function SearchRecipes() {
//   // set state for user's ingredient search
//   const [ingredients, setIngredients] = React.useState('')






//   return (
//     <div>
//       What's in your fridge?
//         <input type="text"
//         id="user-ingredients"
//         onChange={(e) => {set}}

//         >
//         </input>
//     </div>
//     );
// }





function App() {
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