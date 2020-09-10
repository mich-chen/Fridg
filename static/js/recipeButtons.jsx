// ***** Buttons for Recipe Card and Recipe Details *****

// ***** Static buttons *****

function SavedBtn(props) {
  return (
    <Button className='saved-btn'> Saved! </Button>
    );
}


function FavoritedBtn(props) {
  const text = 'Favorited &hearts;';

  return (
    <Button className='favorited-btn'>
      <img src="https://img.icons8.com/cotton/64/000000/hearts--v2.png"
           height='30'
           width='30' />
    </Button>
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
    <Button className='action-btn'
            onClick={handleClick}> 
      {buttonText}
    </Button>
    );
}


function ModalButton(props) {
  // Button to render if user is not logged in
  const {showAlert, setMessage} = props.alertProps;
  const [show, setShow] = React.useState(false);
  const [newUser, setNewUser] = React.useState(false);

  const handleShow = () => {setShow(true)};
  const handleClose = () => {setShow(false)};
  const handleNewUser = () => {setNewUser(true)};
  const handleExistingUser = () => {setNewUser(false)};

  const MODALFOOTER = {
    false: (
      <div>
        New user?
        <Button variant='link' onClick={handleNewUser}>
        Create account
        </Button>
      </div>
      ),
    true: (
      <div>
        Have an account?
        <Button variant='link' onClick={handleExistingUser}>
          Log in
        </Button>
      </div>
      )
  };

  return (
    <div className='recipe-modal'>
      <Button className='recipe-modal-btn' onClick={handleShow}>
        {props.text}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          Log In to Access All The Yummy Features!
        </Modal.Header>

        <Modal.Body>
          {!newUser ? <Login showAlert={showAlert} setMessage={setMessage} /> 
                    : <CreateAccount showAlert={showAlert} setMessage={setMessage} />}
        </Modal.Body>

        <Modal.Footer>
          {MODALFOOTER[newUser]}
        </Modal.Footer>
      </Modal>
    </div>
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
    .then(props.handleRemove);
  }

  const handleClick = () => {
    if (window.confirm('Are you sure you want to remove this recipe?')) {
      removeRecipe();
    }
  };

  return (
    <Button className='remove-btn' onClick={handleClick}> 
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
  };

  const addRecipeToDb = () => {
    fetch('/api/add_recipe', 
            {method: 'POST',
              body: JSON.stringify({recipe_details: props.recipeDetails}), 
              headers: { 'Content-Type': 'application/json'},
              credentials:'include'
            })
    .then(res => res.json())
    .then(data => {if (data.success) {addRecipeToSaved()}
                  }
          )
  };

  return (
    <div className='search-results-btn-container button'>
      {isSaved ? <SavedBtn /> 
        : <ActionBtn action={addRecipeToDb}
                     initialText={'Save this recipe!'}
                     updateText={'Saved'} 
                     />}
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
  };

  return (
    <div className='saved-recipes-btn-container button'>
      {isFavorite ? <FavoritedBtn /> 
        : <ActionBtn action={favoriteThisRecipe}
                     initialText={<img src="https://img.icons8.com/cotton/64/000000/hearts--v3.png"
                                       height='30'
                                       width='30' />}
                     updateText={<img src="https://img.icons8.com/cotton/64/000000/hearts--v2.png"
                                      height='30'
                                      width='30' />}
                     />}
    </div>
    );
}