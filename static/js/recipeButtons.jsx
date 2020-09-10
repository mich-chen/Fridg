// ***** Buttons for Recipe Card and Recipe Details *****

// ***** Static buttons *****

function SavedBtn(props) {
  return (
    <Button className='saved-btn'>
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAOAUlEQVR4nO2dWXAc1bnH/1/P9KzaRiNZmgEr1uZFUWKMuAbbBAQ2CsIeU4GoyoFyLnVTRVVCLjfhgVSl7nMqVVRCoAoqxUMqiS8Ft2xWO1ZsC0c4V4HrIGODwJatzcbWaJtFI82MZuk+ebCdaLpbmp6lZ0bW/N70dZ9F5z/d55zvnPM1UKRIkSJFihQpUqRIkSK5hfJdgVRpa3uar6iZredYrBp6zgoR5QysFAAINAcOs4iLQZH4af9k+Wh//2uxfNc5FQpaEJfLZQmLhu0A2gFqBdgmgOoB8CqziIEwAoYLABsA0Bu0cH0fHTwY1qzSGVJwgnQ8um+tGBOeZIROArsbgDHLRUTA8DERumOi+Hpv99tXs5x/RhSEIC6XyxJmxu+C4fsAHgDA5ahoEaCTxPDHeSsOFcKTk1dB2ru6SvgwfsAY+xkARz7rAmAGhFfi+vhvet9915+vSuRFkI6O/VaBDz1PoGcBVKhNZ7IaYS23wFJhhtlqgt6gh57noON1AAAhJiAeExGLxrAwH0FoNozgbAgLwUgq1fOB8DIXNb9w/PiBYGr/WebkXJCH9nR9h4niSyBam+zeEpsVdmcFbI4K2Bzl4A36tMqMRePwuWfhc/vhGfdj3qeqna+A4dmeo4feS6vQNMmZILtcXXUQ2asAdi93n7nEBEfzGjgaa2AtN2tSl6A/DPfwBNxD0wjPLyx/M+EIp9P/6Ph7b36lSWVkxeWAjj2Pu0RGvwdQudQ9ttpyNNyxFvbblrxFE2au+jB67gp8E7PL3eZhDE99cPTQEa3ro6kgbW1P85U1nl8yop8uVZbdaUPDljrYasu1rEpSfBN+DH96Bd7xJftzBuBXvonKn2s52dRMkM7OJ8tiXPRdgD2gdN1kNWLDPY2oWVelVRXSYmJkGhf/fxgLoajidUY4aRCM3+nufj2gRfmaCLJz7/dqSIx1g2GLrEAirG1xovmuddDpdVoUnzHxmIChT0bx1Xk3GGMKd9AZptM/8sH7b0xmu+ysC/Lww/vWxXXxEwCapNd4I4/W+9ajus6e7WI1YfqKBwOnBhGLxJUuD+kF/UN//vObY9ksM6uC7Nz7vRoSYv8HBTHKq0uxeWcLTNZse0K0JTy/gM8+OI/ZmTmly0NMx9+bzScla++Mzs4ny0TETgD4uvSa3WnDlm+3wmBS6xMsHHiDHo7GGsx55hEKyDwrlSSKHXVfX//m2IULScbP6siKIG1tT/OG0uCfALZdes3RtAbffLAFOn2u3FPZh9MRahqqEZ6PYN4rmVQSaohxWytL733D7e4XMy4r0wwAoLLG80ul0ZSjaQ1a79sAjisIH2ZGcByh9b71cDSukV0jhgdttd5fZKOcjJ+QXbu7doPwMiT9kd1pw+YHW0C3gBg3ISJU19mXen1ta2huOTty6cvBjMrIJPENd8inkMzAy6tL8W+PfBNcgQ5rM0WIifj70XMIyDt6D6fXb8nEzZLZK4uxVyARQ2/UY/MDLbesGACg4zncsasFvFE2SLGL8fhrmeSdtiC7dn/3MTDsWWwjIrR+awNMpStraJsOJqsRrfetB5HsJfNwx57HXenmm5YgHR37rQBelNrXtjix5msrY9KXDarr7Lh9k3xdTWB42eVyWdLJMy1BBD70PIC6xTaT1Yjmu9alk92KprmtHkaLIcFGoHVhwfhcOvmlLEhn55NlBPpPqX3DPY0F65vSEr1Bh/V3N8ovEH66Y+/e0lTzS1mQqC7yDADbYpvdaSs4r20ucTRUo9IhW4muNImGH6aaV0qCuFwuCwE/kdobttQp3b6qUGoDYnhuW1dXSsueKQkSEg1dYEiYqtpqy/O+uFQIVDoqUFFTJjXXWMLssVTySUkQAu2X2hruSLpXQXOISGn4mXPqNys8JSK+n0oeqnvhB/d03UbAS1gkornEhI3bZJ72nLK1+U507XgU92y4C6Io4prXnbe6WMvNuHZxAvGY8C8job6uaePvxobOq1phVP2EcCL2QyKgo1nuaMslVWWVuL91B3gdD17H4/7WHbCX5naThBRHk6xNOD3H7VObXrUgjNApK7yhRm1yTbCXyiehVWX5nZg6m2qVzA+rTa9KkOujK3b3YluJzQprhTb7ptSi1G/kuy+xVphRYpNN0re3tz9lUpNelSAhwbQDkl3olU7VO0BXHTb5nMSsswa2qUmrShAi8X6pTWEiVOQGdqdNZuPAKW6Hkt+nCvpGwl9EsDmKc4+lsNWWy16djCW24VKoFIRtXPyX0WJIe+PzaoA36mEwS9ZKSNygJm1SQdranuZvHCP7J9aKtDzLqwp5G1Fje3t70l9xUkHKqn0NkJzps2i0K/1WQmHnvoEvsdcr3buYpILoSZC5cc0lqkZwqxqTQhuJ4JK6xJM+QiLpSgmJ+1tvnljSiqqySlUzbmelfBLmrKwFY8m3R3nmvJgJeNOqnxr0vLxpOWJJ10eSv9OIlUq3G+s1FGRr8524v3VH2unbGjejrXGzqns/HOjD6Utn0i5rOfS8/OXDhOSCJH1l3TyUn1iYNoIQEbZv2qpJ3kps27hVs5m9TuEJAUcy/7zsFi0qUyR9kgpCINlusAT3chZhjOFv509rkrcSf7tweonzH5kjxBSOMIgsqQs+eafOaI4osdJaCQIApy+dwfDEGKrKknfqt9mdsv6if/gcrnnGk6adCXjhmdOuU4/H5AML0sl/3FKSd+pMmGOU+CAJGgoCXB8BqWksIk4myLh3AoPXhrSqmmriCk+IyJILkvSVJRI/LbUlPUpcBAsKbaTnIGtLKUkF8U+WjwJIOHUa8uc9JEjBE5S3UTQSmB5Lli6pIP39r10PcbS4sNlQSpVbjSi00VBvb6/iYcXFqBv2MiSceYiEoogrH4QsAiAWiSMalhxlZ3RRTVq17vfPE/5iDN7lIx+sanxuv2w4zUj8TE1atRPDXqnB685bBKOCx6PQNkT0FzVpVQkStHB9ABJiHC0TgmLV4x33SU3h+HzJx2rSqhLko4MHw2BIyHDeF8x75640y9Zq5q2WoD+sMMKivt7e36uaK6j2ZRGhW2pzD2U9skRKeOY8MttMQG7LJeNDEzIbU2i7pVAtiED0PwASpujuoaTzHE2ZCXjx4UAfovEYovEYegf6NHWHqME9NCU1iQz4X7XpU/I979rddQJguxbb7vz2N1B1u3zbSy656ULP9+tq5qoXZ44NSKx0rOdPB7O7c/FfebMDUtPI2cspZaEFjLG8iwEAI2evyI0Mf0wlj5QEMVPkEAgJz6R/MgDfRHHE5XX74Z+Uedcngla8k0o+KQly+PDhEESSnb4d/lThl7HKGD6j8KZg9OtUYwGnvGLIM8OrABIG2t5xPyZH89vB5xP38JRSzEZPWB/5bap5pSxId/frgRuxTRIY/HhY04WrQiUeFXDx9IjCFXqx7/33k65/SElrTZ2Lml8AkPCeWghFMdw/lk52K5pLn4wiIo/POBq04Nfp5JeWIMePHwgSkew07pUvxzF1eSadLFck01c8uHpBfoSOI/Zf6caRT3vXyYkjB99hjA4vtjHGMPDXiwjP3forigvBCAZODSoNt987fuStw0pp1JDRNiAdr3sGQIKvIh6J47OT5yEoLPLfKghxAWd7vlAKjjkTF8UfZ5J3RjvehgcHAo0bNg0A9AQWzfojoShmpwOobai+pQKYAYAoMpzr+QK+CdmcgxHoiZNH3/p7JvlnvAVx5OL5Sw3rW0oAJMRbDM8tIDwfwZqv2fN+7i+bDHw4iKnLcgcmMbxw4uihVzLNPys7F30TlT9nhJNSu3toEgOnLkIU8+/WyBQmMnzeewHuYZnzEAD1eCcr/zsb5WRlk67b3S86Nza9wzNdBwDn4mvz3iD8UwGsWVcFTrcyd64KMRHnTn6JyTGFESTDZ4hSZ1/fgawsDuUskHJZVSk279y04s6WhOcWcO7klwjMzCtdHuJiwo7jx99RemzSIqehxvVGPVq/tWHFRJ2buuzBF6cGEYuu0FDjN7n+pMSPAuxOWYFEuH2TA81t9dAbCjPgWTwq4NIno7h6Yalg/OjnYsIj2XwybqLx5yoibwPYqXTdaDFg/d2NcDRUa1WFtJgYnsLg6REld8gNqCesizyWjp9KDZr9RIeGPo/Yyu59w1wSNgPYBon4QkzA1NgMfBOzMJUYYS7Nb9/idfsxcGoQlweuLbWZnBHDC/HQzH/89dgxzVwROZkg7NrdtRtgfwCwZOdRUVOO+s1rUb0215888mLk7FfwTy678W+GiP37iSNvHdW6PjmbsXU8um+tEBNeIWLLxrQ1WY1wNK2Bs6lWs+A2QX8Y40MTcA9Nqfmk3vtxUXwmV18Ezf1n83Z37RUhvkSgdcnuLbFZYHNUwO60wVZbDt6Y5mfzIvHrn8xz++Ed9yntTFdilDE8m4sPgS0mLz4Nl8tlCQvG50D4CZZ5jUkxWQywVFhgLTfDZDWBN/LQ8dw/w9MKcQFCTEQsEkN4PoJQIISQP7Tk96SWwAPQi0ELUl5+zQaF8unV5yGZ4eeBaRBexQK92NNzMG87yQvC67etq8tcEhIfZ4z2g7ATGo7+JAgA9TBiB0JmenvVf5xYiYf27nMyIf4ErofF2w4g2z17GKA+RujWx4Q3jh17O39RMxUoOEEW097+lElnDWzjwD0gAq0EthGgRgCGpImvEwXYMANd4IABEeJfhGDZR2o3PueDghZEifb2dj1fYq8XwVVBRAlHrOJmtAkCzYmM/OAwr+cwHQlMj6k5RlakSJEiRYoUKVKkSJEiq5l/AJ/g6ctdxmJ6AAAAAElFTkSuQmCC"
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
           height='35'
           width='35' />
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
                     initialText={<img src="data:image/png;base64,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"
                                       height='50'
                                       width='50' />}
                     updateText={<img src="data:image/png;base64,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"
                                      height='50'
                                      width='50' />} 
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
                                       height='35'
                                       width='35' />}
                     updateText={<img src="https://img.icons8.com/cotton/64/000000/hearts--v2.png"
                                      height='35'
                                      width='35' />}
                     />}
    </div>
    );
}