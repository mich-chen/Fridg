// ***** Missing Ingredients Shopping List *****


function MissingItem(props) {
  const {checkedBoxes, handleCheck, amount, unit, name} = props;
  const missingIngredient = `${amount} ${unit} ${name}`;

  return (
    <div>
      <form className='missing-ingredient-item'>
        <input id={name}
               type='checkbox'
               value={missingIngredient}
               checked={checkedBoxes.hasOwnProperty(missingIngredient)}
               onChange={handleCheck} />
        <label> {amount} {unit} {name} </label>
      </form>
    </div>
    );
}


function MissingIngredientsList(props) {
  const {missingIngredients, ...others} = props;

  return (
    <div className='missing-ingredients-list'>
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

  const handleClick = () => {
    if (!loggedIn) {
      alert('You must log in or create account to send shopping list!')
    } else {
      fetch('/api/shopping-list', {
        method: 'POST',
        body: JSON.stringify({shopping_list: props.shoppingList,
                              recipe_title: props.title}),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      })
      .then(res => res.json())
      .then(data => alert(data.message))
    }
  };

  return (
    <div className="shopping-list-btn">
      <button id='shopping-list-btn' onClick={handleClick}>
        {loggedIn ? 'Send shopping list to phone!' : 'Log in or create account for shopping list!'}
      </button>
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
      <h4> Currently missing ingredients </h4>
      <p> Check the ingredients you'd like to add for a shopping list! </p>

      <MissingIngredientsList missingIngredients={missingIngredients}
                              checkedBoxes={checkedBoxes}
                              handleCheck={handleCheck} />

      <ShoppingListBtn shoppingList={shoppingList} title={title}/>
    </div>
    );
}
