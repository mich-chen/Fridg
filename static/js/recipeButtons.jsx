// ***** Buttons for Recipe Card and Recipe Details *****

// ***** Static buttons *****

function SavedBtn(props) {
  return (
    <Button id='saved-btn'> Saved! </Button>
    );
}


function FavoritedBtn(props) {
  const text = 'Favorited &hearts;';

  return (
    <Button id='favorited-btn'> Favorited &hearts;  </Button>
    );
}


// ***** Event/Action Buttons ***** 

function ActionBtn(props) {
  // pass initial text, updated text, and action as props
  const initialText = props.initialText;
  const [buttonText, setButtonText] = React.useState(initialText);

  const handleClick = () => {
    props.action();
    setButtonText(props.updateText)
  };

  return (
    <Button id='action-btn'
            onClick={handleClick}> 
      {buttonText}
    </Button>
    );
}


function ModalButton(props) {
  // Button to render if user is not logged in
  const [show, setShow] = React.useState(false);
  const [newUser, setNewUser] = React.useState(false);

  const handleShow = () => {setShow(true)};
  const handleClose = () => {setShow(false)};
  const handleNewUser = () => {setNewUser(true)};
  const handleExistingUser = () => {setNewUser(false)};

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
      <Button variant='primary' onClick={handleShow}>
        {props.text}
      </Button>

      <Modal show={show} onHide={handleClose}>
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


function RemoveBtn(props) {

  const toggleBtn = () => {
    document.getElementById('remove-btn').innerHTML = 'Removed!'
  };

  const removeRecipe = () => {
    fetch('/api/remove_recipe', {
      method: 'POST',
      body: JSON.stringify({recipe_id: props.recipeId}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
      .then(toggleBtn)
  }

  const handleClick = () => {
    if (window.confirm('Are you sure you want to remove this recipe?')) {
      removeRecipe();
    }
  };

  return (
    <Button id='remove-btn' variant='secondary' onClick={handleClick}> 
      Remove Recipe
    </Button>
    );
}


// ***** Search Results Button Container *****

function SearchResultButton(props) {
  // isSaved is boolean passed from parent component
  let isSaved = props.buttonStatus;

  const addRecipeToSaved = () => {
    fetch('/api/save_a_recipe', 
            {method: 'POST',
              body: JSON.stringify({recipe_id: props.recipeId}),
              headers: { 'Content-Type': 'application/json'},
              credentials:'include'
            })
    .then(res => res.json())
    .then(data => alert(data.message))
  };

  const addRecipeToDb = () => {
    fetch('/api/add_recipe', 
            {method: 'POST',
              body: JSON.stringify({recipe_details: props.recipeDetails}), 
              headers: { 'Content-Type': 'application/json'},
              credentials:'include'
            })
    .then(res => res.json())
    .then(data => {alert(data.message);
                   if (data.success) { //success is boolean
                    addRecipeToSaved()
                    }
                  }
          )
  };

  return (
    <div>
      <section className='button'>
        {isSaved ? <SavedBtn /> 
          : <ActionBtn action={addRecipeToDb}
                       initialText={'Save this recipe!'}
                       updateText={'Saved'} 
                       />}
      </section>
    </div>
    );
}


// ***** Saved Recipes Button Container *****

function SavedRecipesButton(props) {
  let isFavorite = props.buttonStatus;

  const favoriteThisRecipe = () => {
    fetch('/api/favorite_a_recipe', 
            {method: 'POST',
              body: JSON.stringify({recipe_id: props.recipeId}),
              headers: { 'Content-Type': 'application/json'},
              credentials:'include'
            })
    .then(res => res.json())
    .then(data => alert(data.message))
  };

  return (
    <div>
      <section className='button'>
        {isFavorite ? <FavoritedBtn /> 
          : <ActionBtn action={favoriteThisRecipe}
                       initialText={'Saved! Not favorited!'}
                       updateText={'Favorite <3'}
                       />}
      </section>
    </div>
    );
}