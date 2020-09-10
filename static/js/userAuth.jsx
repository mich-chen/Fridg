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

      <label> 
        <img src="https://img.icons8.com/cotton/64/000000/secured-letter--v3.png"
             height='25'
             width='25' />
        {'  '}Email: 
      </label>
        <FormControl className='email'
               type='text'
               onChange={(e) => {setEmail(e.target.value)}}
               value={email} 
               placeholder="email@email.com"
               required
               >
        </FormControl>
      <br />

      <label>
        <img src="https://img.icons8.com/cotton/64/000000/lock--v1.png"
             height='25'
             width='25' />
        {'  '}Password: 
      </label>
        <FormControl className='password'
               type='password'
               onChange={(e) => {setPassword(e.target.value)}}
               value={password}
               placeholder='password'
               required
               >
        </FormControl>
      <br />

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
          <label> 
            <img src="https://img.icons8.com/cotton/64/000000/secured-letter--v3.png"
                 height='25'
                 width='25' />
            {'  '}Email: 
          </label>
            <FormControl className='email'
                   type='text'
                   onChange={(e) => {setEmail(e.target.value)}}
                   value={email} 
                   placeholder="email@email.com"
                   required
                   >
            </FormControl>
          <br/>

          <label>
            <img src="https://img.icons8.com/cotton/64/000000/lock--v1.png"
                 height='25'
                 width='25' />
            {'  '}Password: 
          </label>
            <FormControl className='password'
                   type='password'
                   onChange={(e) => {setPassword(e.target.value)}}
                   value={password}
                   placeholder='password'
                   required
                   >
            </FormControl>
          <br/>

          <label> 
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAM4ElEQVR4nO2ae3TURZbHP/XrX7rz6rwgJIFAAiRMJJAECMprMTOEoDwGlOBjHsrZOaKoYED0eJwzO3F3Zv5QB9xFZcRRl6OegQHUhQVceex4BplhCK9AZgQjkCB5Ank/Ot39q/0j+f3SSbrTnU4HnVm/5/Q5datuVd26v+qqe29d+Bb/vyEG0zknJ0e1WGJiNYtZHNyzvRKQAZLrlmFACli06AfRNmz3CMR8CXOBkS7NZUKKnx3cv/PdwIo4tPBJAQsW3JugmcQGKcQjgLXfAaV88uD+3a8FRLpbAK8KmL9w+YNSiNeAaHftIcHBOJxO7Ha7XtXUZuoY9dmePU0BlHPIoHpqKCwsVI6eOLdFIla51o9OHEnud+9k6pQMxiaPwWI209LSyqNrN1BdXQtgDdXMtwOHh1j2gMCtAnJyctSjJ87/J4gf6nUjYoez+pGVzJ55O0L03DhhYaEkxMfpCkDTCBlCmQMKtwoICh3+SwnG4ufOmcn6NY8RFhbqcSB98QAK4qtACjmU6KOA+Uvy86TGBp2+O+97rFvzWJ+v7gqn00lN7fXuQaX5UqAFHSoorsS0aauCNE2+oddPm5LhdfEANbXXcTqdOll74MD7jUMh7FCghwKi4useEohkAKs1nGfXPel18QAVldWu5N/N14deChBIY+vnL1tCTIzbm68PKqv+ARQwf/HyVCANIDjYwtLFd/k8SFUPBci/KwW4HILKQt2Uz8qY1O+J3xuB2gEpX6yxhDSoE4QUE4SQsRoiEkAIbBLZYNLkZbsM+rzk9peq/J2jN7oVIOUMvZg9NWtAg1RW1RhloShfDqRv5vH1EzBp90up5NIg7wAsCIkEhO5byU6TVRMCk3CQUbSuXCCPINjbEuHcV5q62TYggV3geg1O1gsp45J9HqC93Ub5V9cM2ikp9dpJFioZRfX3glgvhZwJAsSAHMkxErESycrQBrUu40TBNpzOXxfP2Dxg+0MArFixwlzXKpuBICEEH2x/h/CwMJ8G+HDPfl7f+o5Olh3atyu5P/6Mk+vuQrIRuK2vMIJESwzJwSOIN0djNQUD0KE5qHe2cqW9hsvt1bQ43X7wDuA3ikn+/MyUV+p9Ep6uHXDTpqUJRBBA7PBhPRZ/payci6WXmJA6njGJo1CUznNTSsm+jw/y5jvvuS7gbU8TpR1/YpjFZN4iJStc64OEibmR6SyIyWK6NYUYNbxfgTWpUdJ6laMNn7PvZhFXbTf0JjOwVnOK+zJPFjxxdtorH/isAOEgTfcLk5PGGI1NTc2sefp52ts7NR4UFMSwmGhCQ0KorKqmrb3dZSh5MVixvexuksmnCmYKTeyQMFqvs5pCeHDEHH4w4p+I9rJoVyhCYXJYEpPDknhsZB7HGi/wZuVBTjdf1lnipRS7Jxet36yFRGwoSS/s8KoAUJL0GyA+foTRWFVdYywewG63U1VdgxuUKopy1969e1t7N0wuKlgmNPE7IBg6t/n3h01nXeLiAS3cHQSC2RFpzI5I43B9MS9e/YiqjvquNrlGaWv4TnrJ48tL0l9v9jRG534WMlmviIuN9cTrpG/IqxLBL9pMHVM/2bvzcu8OGScKHhSIXXQtPkoNY3PKT/jX5AcGvfjemBeVwe6JzzI/OtOoE5BnarMcTC953ONkXTtAJOtrixsx3AOr/DI6VJlY20KsCrGYaDi0d+dVPMQBM08+tUBKsQ0wASQHj2BL6ipGmmMGujafEW4K5uVxD7O18iCvV3xM52XKDFNb8K5pRauWnMzeau/dp0sB0vhvxo3wuAPYuXOnE6jq+nlE+sl1KZrk9wKCAFJDEnhzwuqAf3VPWJUwnyg1jF+V7+5SglxgJ+wloKA3r24KG6uOjooa1OTpJYVmk2SHgAiAkeYYtqQ+essWr+O+2Fk8PnKBa9XayUUFy3rz6Qow9qU1YnCCmlobnwGmApiFysbxK4kNihjUmP5iVUIeudEZOikE4jdZpwt6fGHl7rt/GEHnHYqqqoQEB/s94ZRTTych5PM6XZC4mNtCE/0eLxAoTLqfOLOx5jjNKQpd2xWbaDN83ghruE/+vyc4Ne05IBTgttBEHoyd4/dYgYLVFMKGxKWuVY9lnlk3SicU1SSMAGZwsMXvidL/8kw8sFKnn078PopQPHe4hciLziQrfKxOWnDytE4oTtG5/aHzL+AvFGF/iK77PjMsmenWFL/HGgo8Ep9rlKXk4fSSQjOAgpTGZ1fVIL8nEIIf6+X7Ymf5Pc5QYXZkGqMsxlkfo7Y3LAJQpKYYq1ZVk1+DZ50uSAYxCSBUsTCv++T9xkAgWBSTbdAaYjGAIsTAHHF30Bxinl6eZh1HiGLuj/1rw5zINKMspJwHoJgkhrfksDv8Glgqcrpezv6G/fddMSl0DKGK8Y9PmvTnp+JUcNi6zHXsDv8UIBCGalNDErzy2zQ726r/l+qOBr/mA1CFiSXDspkUNsY7cxdMQmFsSBwlLeUAKEHKBNUpzR1CdD5qOPxUABLjjkmyePYldGyvPcprFR/7N5cLDtcXcyijcEB9ki2xhgKQjFMUVRi+cmtbm7+yROqFKNV7KC0qQH7BsKB+UxXcIlJ1jXaLSFW1N9ywK51CNzU1I6X0xxoMBVAQhPpwAC4dNp3hQVYqO+oGOo8Bs1CZGzlxwP3CTC7GnsSqHjhwwJa7KL8ZCNc0jZaWVsLDfQuIuuCPwPduj0j12fqbHZHmnWkIYNec3YQiO3RpjchiY9PAEztaIx0LXxr38NZXUx4ZrHxDjmatO44pJE1dIV5hBPrq6nyOKBsoTd1sy4vOrAwS/hlStxJ6zBBAQ1Z1RoWFLJMwHaCqppb0ie63Z87CFfGqkLMQYqSUWhOacuLwgZ1/vRWCBwqX27uf8VTFdFEF0KBMP/Zqamrd9QPEeFXICkAgJQIBimT+ovxjUpNPDq3YgcF1eyMVNuPgbe+wWEu7doC4guy0iKs9KgC3+1vCLBTxp90f7d29fNkSn4W50HqNMtt174weEKKYybaOH5DZfbzpCz1QCnCsJL2wo9P/lRghbddkB1Mv58hsDmL61CkkJMRRe/0Gfz5ehK2jA8Dy9rbf5c+ZNaPfoKqOg3Vn2XBpm8+Ce0JW+Fi2fWeNz/yf1J1xocQh6IoKq05TicPUaQVeKSs3WJJGJzJ+XDKXr5ST+925rPrJQ0RGdBsflVXVPPPTF6iurqXDbje/v30X69eu9ipI+SC+vCvK2j3u1j64YW/iaMPnOimllDugO1FS5C7Kb6ArC3Tne78lKipS56S1tc1jvsCZs+d55qcvABAeFsYH29/xakg1O9t5tWI/N+z+51KahIl7ht/BHdZUn/j//dp/83bVEZ38Y3H2prnQ/TwugfPATIArZVfJ6lKAEKLfZInMjHQiIyNoaGikuaWFaxVVJI7q3yEKNwXz3Oh7fRI8ELhub2JH7WcGLZEb9bKL2SbP6aULpb7nOAghGJNoxBipqAxY8kbAsPGrPa5P6sXnpr3yXzrRrQCpfKoXi065HhbekRAfZ5R7pct87ThSf479N091Vwi5rjv1xEUB0uL4HzofQDlf8jdu3PTdUUlI6FbAtYrKQQkcSFy13eDnV7YbV59AvF887ZUjrjyGAg5/+OENAUcAHA4nO3Z95PNEI+PjjbJrvtDXiXpHC0+UbqXRabj45Y4OubY3Xw/XTQp+pZf3fXywx5XYH1JTxhonf3i479llQ4Xqjnr++eJrrtdkqxTKvSWzNt3szdvD0rl08a9Xxk1IvxMY63RqnDv/N/Lm5Xh9L4iMiCA1ZSxjRifyowfysVj8f2AZLM63lLO69A2udtsaDgW5vDh706fu+Ptc2HlLHxitORxn6HownTQxjV++8DyhId/sDHin1Hi35lNevbYfuzR8fptE/Phc9sadnvr1se+/vHC+cVzqbV8iRD4gamqvc/L0WTImTSQy4ut55fWGY42fs+HSNvbdPInWfcDXIeTSc9mb9vXX16PJNm/R8ocF4i26lGQxm7k/fxnLltyN1Xpr3/rdocVp41B9Mb+v/YzzLX3OquMmRbn/9NRfl3kbp1+bNXfh8uUI8RYuQc+Q4GBmzshmalYG48cmEx0dRXRUpJE+F2hoSJqd7dQ7milrv87FtgpONJVyqvkSNq1PxkuzgEKVlv9wlw7jDl6jn7lLVoxB4y2QuZ54wsJC+bd/eY7J6d25jxfbKniy9LdUdww8wuQH2oA3hcqLZ7M2XfPK7QKfw7+5i/NzBDwrJXe56zclK+MPL/7iZ1vo9C/CV3/xxpJjjRcWD0QYP3BGIN6VQcp7xZkv+2WADDj+nZd3zwhNVXMR2p0gRgFxEtFqUrRHP9m72/A3J518KkORyl7A96cb99CABqAOyWWEvAjiOA7HYX9yg7/Ft/gWPfB/X6g/BcYL0/4AAAAASUVORK5CYII="
                 height='25'
                 width='25' />
              {'  '}Phone: 
          </label>
            +1 <FormControl className='phone'
                   type='tel'
                   onChange={(e) => {setPhone(e.target.value)}}
                   value={phone}
                   placeholder='Enter in 10-digit format'
                   maxLength='10'
                   required
                   >
              </FormControl>

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
    <Row className='user-auth-modal'>
      <Col>
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
      </Col>
    </Row>
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
    <Container>
      <Row>
        <Col className='logout'>
          <Alert variant='warning' show={show} onClose={handleClose} dismissible>
            {message}
          </Alert>

          Logged out! 

          <Button id='logout-btn' variant='info' onClick={handleClick}> 
            Click here to go back to home!
          </Button>
        </Col>
      </Row>

    </Container>
    );
}

