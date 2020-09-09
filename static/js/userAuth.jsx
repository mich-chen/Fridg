// ***** Log In component *****


function Login(props) {
  let history = useHistory();
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
    });
  };

  // reset form fields after user clicks submit
  const resetForm = () => {
    setEmail('');
    setPassword('')
  };

  // set onChange listener for change in textbox
  return (
   <div className='login' 
        style={{display: (loggedIn ? 'none' : 'block')}}>
    <form className='login-form'>
      <h3> Log in to see your saved recipes! </h3>
      <br/>

      <label> Email: </label>
        <input className='email'
               type='text'
               onChange={(e) => {setEmail(e.target.value)}}
               value={email} 
               placeholder="email@email.com"
               required
               />
      <br/>

      <label> Password: </label>
        <input className='password'
               type='password'
               onChange={(e) => {setPassword(e.target.value)}}
               value={password}
               placeholder='password'
               required
               />

      <br/>

      <Button className='login-btn' 
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

function CreateAccount(props) {
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
      setLoggedIn(data.success);
      props.setMessage(data.message);
      props.showAlert(true)
    });
  };

  // reset form fields after onClick of create account button
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setPhone('');
  };

  return (
    <div>
      <div className='create-account'>
        <form className='create-account-form'>
          <h4> Create a new account to start saving recipes! </h4>
          <label> Email: </label>
            <input className='email'
                   type='text'
                   onChange={(e) => {setEmail(e.target.value)}}
                   value={email} 
                   placeholder="email@email.com"
                   required
                   />
          <br/>

          <label> Password: </label>
            <input className='password'
                   type='password'
                   onChange={(e) => {setPassword(e.target.value)}}
                   value={password}
                   placeholder='password'
                   required
                   />
          <br/>

          <label> Phone: </label>
            +1 <input className='phone'
                   type='tel'
                   onChange={(e) => {setPhone(e.target.value)}}
                   value={phone}
                   placeholder='Enter in 10-digit format'
                   maxLength='10'
                   required
                   />

          <br/>

          <Button className='create-account-btn' 
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
  let history = useHistory();
  const {show, handleClose, ...others} = props;
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
    <React.Fragment id='user-auth-modal'>
      <Modal show={show} onHide={() => {handleClose; history.goBack()}} >
        <Modal.Header closeButton>
          Log In to Access All The Yummy Features!
        </Modal.Header>

        <Modal.Body>
          {!newUser ? <Login {...others} /> : <CreateAccount {...others} />}
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
  const [message, setMessage] = React.useState('');
  const [show, setShow] = React.useState(true);

  // update loggedIn context to false in App
  React.useEffect(() => {
    fetch('/api/logout')
    .then(res => res.json())
    .then(data => {
      setMessage(data.message);
      setLoggedIn(false)
    })
  },[]);

  // back to homepage
  const handleClick = () => {
    history.push('/')
  };

  const handleClose = () => {
    setShow(false);
  }

  return (
    <div id='logout'>
      <Alert variant='warning' show={show} onClose={handleClose} dismissible>
        {message}
      </Alert>

      Logged out! 

      <Button id='logout-btn' variant='info' onClick={handleClick}> 
        Click here to go back to home!
      </Button>
    </div>
    );
}

