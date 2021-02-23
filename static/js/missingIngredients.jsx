// ***** Missing Ingredients Shopping List *****


function MissingItem(props) {
  const {checkedBoxes, handleCheck, amount, unit, name} = props;
  const missingIngredient = `${amount} ${unit} ${name}`;
  // checkbox with missing ingredent info as a string value for db
  return (
    <div className='missing-item'>
      <form className='missing-checkbox'>
        <input id={name}
               type='checkbox'
               value={missingIngredient}
               checked={checkedBoxes.hasOwnProperty(missingIngredient)}
               onChange={handleCheck} />
        {'    '} {amount} {unit} {name} 
      </form>
    </div>
    );
}


function MissingIngredientsList(props) {
  const {missingIngredients, ...others} = props;

  return (
    <div className='missing-list'>
      <ul>
        {missingIngredients.map((ingredient) => 
          <MissingItem key={missingIngredients.indexOf(ingredient)}
                       {...others}
                       amount={ingredient.amount}
                       unit={ingredient.unit}
                       name={ingredient.name} />
        )}
      </ul>
    </div>
    );
}


function ShoppingListBtn(props) {
  const {loggedIn} = React.useContext(AuthContext);
  const [alert, showAlert] = React.useState(false);
  const [isValidPhone, setIsValidPhone] = React.useState(false);
  const [textMessage, setTextMessage] = React.useState('');
  const VARIANTS = {
    true: 'info',
    false: 'danger'
  };
  // if logged in, button will send shopping list to user's phone
  // not logged in, prompts login modal
  const handleClick = () => {
      fetch('/api/shopping-list', {
        method: 'POST',
        body: JSON.stringify({shopping_list: props.shoppingList,
                              recipe_title: props.title}),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        setIsValidPhone(data.success);
        setTextMessage(data.message);
      })
    };
  // not logged in renders modal window prompting log in
  // logged in renders button to server and send text
  const SHOPPING_BTN = {
    true: (<Button className='shopping-list-btn' onClick={() => {handleClick(); showAlert(true)}}>
              <img src="https://img.icons8.com/cotton/64/000000/checklist--v1.png"
                   height='30'
                   width='30' />
              {'  '}Send shopping list to phone! 
                </Button>),
    false: (<ModalButton text={'Send shopping list to phone!'} 
                         show={true}
                         alertProps={props.alertProps} />)
  };

  return (
    <div className="shopping-list-btn">
      <Alert variant={VARIANTS[isValidPhone]} show={alert} onClose={() => {showAlert(false)}} dismissible>
        {textMessage}
      </Alert>

      {SHOPPING_BTN[loggedIn]}
    </div>
    );
}


function MissingIngredientsContainer(props) {
  const [checkedBoxes, setCheckedBoxes] = React.useState({});
  const [shoppingList, setShoppingList] = React.useState({});
  const {title, missingIngredients} = props;

  const handleCheck = (e) => {
    e.stopPropagation();
    let newChecked = {...checkedBoxes};

    if (checkedBoxes.hasOwnProperty(e.target.value)) {
      delete newChecked[e.target.value];
      setCheckedBoxes(newChecked);
    } else {
      newChecked[e.target.value] = e.target.value;
      setCheckedBoxes(newChecked);
    };
    setShoppingList(newChecked)
  };

  return(
    <div className='missing-ingredients-container'>
      <img src="https://img.icons8.com/dusk/64/000000/ingredients.png"
           height='50'
           width='50' />
      <h4> Currently missing ingredients </h4>
      <p> Check the ingredients you'd like to add for a shopping list! </p>

      <MissingIngredientsList missingIngredients={missingIngredients}
                              checkedBoxes={checkedBoxes}
                              handleCheck={handleCheck} />

      <ShoppingListBtn shoppingList={shoppingList} 
                       title={title}
                       alertProps={props.alertProps} />
    </div>
    );
}
