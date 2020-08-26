const SERVER_PATH = {
  login: '/api/login',
  createAccount: '/api/create_account'
}


// ***** Log In component *****


function Login(props) {
  // set state for email and password
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const loginData = {'email': email, 'password': password};

  const {loggedIn, setLoggedIn} = React.useContext(AuthContext);
  console.log('login authcontext', loggedIn);

  // send login info to db to login or check credentials
  // update login context of app
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

  // reset form fields after user clicks submit
  const resetForm = () => {
    setEmail('');
    setPassword('')
  };

  // set onChange listener for change in textbox
  return (
   <div name='login' 
        style={{display: (loggedIn ? 'none' : 'block')}}>
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


// ***** Create New Account Component *****


function CreateAccount(props) {
  let history = useHistory();
  // state for email and password for new account
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const newAccountData = {'email': email, 'password': password};

  const {loggedIn, setLoggedIn} = React.useContext(AuthContext);
  console.log('create account authcontext', loggedIn);

  // add account information to db, then push to homepage
  const createAccount = () => {
    fetch('/api/create_account', {
      method: 'POST',
      body: JSON.stringify(newAccountData),
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        setLoggedIn(data.success)
      })
      .then(history.push('/homepage'))
  };

  // reset form fields after onClick of create account button
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



// ***** Log Out Component *****


function Logout() {
  let history = useHistory();
  const {loggedIn, setLoggedIn} = React.useContext(AuthContext);

  // update loggedIn context to false in App
  React.useEffect(() => {
    fetch('/api/logout')
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      setLoggedIn(false)
    })
  },[]);

  // button to go back to homepage
  const handleClick = () => {
    history.push('/')
  };

  return (
    <div>
      Logged out! 

      <button onClick={handleClick}> 
        Click here to go back to home!
      </button>
    </div>
    );
}








