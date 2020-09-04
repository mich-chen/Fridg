// ***** Log In component *****


function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const loginData = {'email': email, 'password': password};
  const {loggedIn, setLoggedIn} = React.useContext(AuthContext);

  // send login info to db to login or check credentials
  // update login context of app
  const checkLogin = (e) => { 
    e.preventDefault();

    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: { 'Content-Type': 'application/json'},
      credentials:'include'
    })
    .then(response => response.json())
    .then(data => {
      setLoggedIn(data.success);
      props.setMessage(data.message);
      props.showAlert(true)
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
      <br/>

      <label> Email: </label>
        <input id='email'
               type='text'
               onChange={(e) => {setEmail(e.target.value)}}
               value={email} 
               placeholder="email@email.com"
               required
               />
      <br/>

      <label> Password: </label>
        <input id='password'
               type='password'
               onChange={(e) => {setPassword(e.target.value)}}
               value={password}
               placeholder='password'
               required
               />

      <br/>

      <Button id='login-btn' 
              variant='success'
              onClick={(e) => {checkLogin(e); resetForm()}} 
              >
        Log in
      </Button>

    </form>
  </div>
  );
}


// ***** Create New Account Component *****

function CreateAccount() {
  let history = useHistory();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const newAccountData = {'email': email, 'password': password, 'phone': phone};
  const {loggedIn, setLoggedIn} = React.useContext(AuthContext);

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
  };

  // reset form fields after onClick of create account button
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setPhone('');
  };

  return (
    <div>
      <div name='create-account'>
        <form className='create-account-form'>
          <h3> Create a New Account to start saving recipes! </h3>
          <br/>

          <label> Email: </label>
            <input id='email'
                   type='text'
                   onChange={(e) => {setEmail(e.target.value)}}
                   value={email} 
                   placeholder="email@email.com"
                   required
                   />
          <br/>

          <label> Password: </label>
            <input id='password'
                   type='password'
                   onChange={(e) => {setPassword(e.target.value)}}
                   value={password}
                   placeholder='password'
                   required
                   />
          <br/>

          <label> Phone: </label>
            +1 <input id='phone'
                   type='tel'
                   onChange={(e) => {setPhone(e.target.value)}}
                   value={phone}
                   placeholder='Enter in 10-digit format'
                   maxLength='10'
                   required
                   />

          <br/>

          <Button id='create-account-btn' 
                  variant='success'
                  onClick={(e) => {createAccount(e); resetForm()}} 
                  >
            Create Account
          </Button>

        </form>
      </div>
    </div>
    );
}


// ***** User Authentication Modal *****

function UserAuthModal(props) {
  // modal window for navbar login and create account link
  const {loggedIn} = React.useContext(AuthContext);
  const [newUser, setNewUser] = React.useState(props.newUser);
  const handleNewUser = () => {setNewUser(true)};
  const handleExistingUser = () => {setNewUser(false)};
  // conditionally render login component or create account
  const MODALFOOTER = {
    false: (
      <React.Fragment>
        New user?
        <Button variant='link' onClick={handleNewUser}>
        Create account
        </Button>
      </React.Fragment>
      ),
    true: (
      <React.Fragment>
        Have an account?
        <Button variant='link' onClick={handleExistingUser}>
          Log in
        </Button>
      </React.Fragment>
      )
  };

  return (
    <React.Fragment>
      <Modal show={loggedIn ? false : props.show} onHide={props.handleClose} >
        <Modal.Header closeButton>
          Log In to Access All The Yummy Features!
        </Modal.Header>

        <Modal.Body>
          {!newUser ? <Login /> : <CreateAccount />}
        </Modal.Body>

        <Modal.Footer>
          {MODALFOOTER[newUser]}
        </Modal.Footer>
      </Modal>
    </React.Fragment>
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

  // back to homepage
  const handleClick = () => {
    history.push('/')
  };

  return (
    <div>
      Logged out! 

      <Button variant='info' onClick={handleClick}> 
        Click here to go back to home!
      </Button>
    </div>
    );
}

