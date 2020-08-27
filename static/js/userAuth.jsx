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
  const checkLogin = (e) => { 
    e.preventDefault();

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
    <form className='login-form'>
      <h3> Log in to see your saved recipes! </h3>
      <br></br>

      <label> Email: </label>
        <input id='email'
               type='text'
               onChange={(e) => {setEmail(e.target.value)}}
               value={email} 
               required
               />

      <label> Password: </label>
        <input id='password'
               type='password'
               onChange={(e) => {setPassword(e.target.value)}}
               value={password}
               required
               />

      <br></br>

      <button id='login-btn' 
              onClick={(e) => {checkLogin(e); resetForm()}} 
              >
        Log in
      </button>

    </form>
  </div>
  );
}


// ***** Create New Account Component *****


function CreateAccount(props) {

  let history = useHistory();
  // state for email and password for new account
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const newAccountData = {'email': email, 'password': password, 'phone': phone};

  const {loggedIn, setLoggedIn} = React.useContext(AuthContext);
  console.log('create account authcontext', loggedIn);

  // add account information to db, then push to homepage
  const createAccount = (e) => {
    e.preventDefault();

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
  console.log(phone);

  return (
    <div>
      <div name='create-account'>
        <form className='create-account-form'>
          <h3> Create a New Account to start saving recipes! </h3>
          <br></br>

          <label> Email: </label>
            <input id='email'
                   type='text'
                   onChange={(e) => {setEmail(e.target.value)}}
                   value={email} 
                   required
                   />

          <label> Password: </label>
            <input id='password'
                   type='password'
                   onChange={(e) => {setPassword(e.target.value)}}
                   value={password}
                   required
                   />

          <label> Phone: </label>
            +1 <input id='phone'
                   type='tel'
                   onChange={(e) => {setPhone(e.target.value)}}
                   value={phone}
                   placeholder='Enter in 10-digit format'
                   maxLength='10'
                   required
                   />

          <br></br>

          <button id='create-account-btn' 
                  onClick={(e) => {createAccount(e); resetForm()}} 
                  >
            Create Account
          </button>

        </form>
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








