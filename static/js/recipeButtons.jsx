// ***** Buttons for Recipe Card and Recipe Details *****

// ***** Static buttons *****

function SavedBtn(props) {
  return (
    <Button className='saved-btn'>
      <img src="data:image/png;base64,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"
           height='50'
           width='50' />
    </Button>
    );
}


function FavoritedBtn(props) {
  const text = 'Favorited &hearts;';

  return (
    <Button className='favorited-btn'>
      <img src="https://img.icons8.com/cotton/64/000000/hearts--v2.png"
           height='40'
           width='40' />
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
      <img src="https://img.icons8.com/cotton/256/000000/trash.png"
           height='40'
           width='40'/>
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
                     initialText={<img src="https://img.icons8.com/android/24/000000/plus.png"
                                       height='40'
                                       width='40' />}
                     updateText={<img src="https://img.icons8.com/ios-filled/50/000000/checkmark.png"
                                      height='40'
                                      width='40' />} 
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
                                       height='40'
                                       width='40' />}
                     updateText={<img src="https://img.icons8.com/cotton/64/000000/hearts--v2.png"
                                      height='40'
                                      width='40' />}
                     />}
    </div>
    );
}