// ***** recipe components that are shared between recipe cards and recipe details *****

function RecipeServings(props) {
  return (
    <div>
      <label>Servings: </label>
        {props.servings}
    </div>
  );
}


function RecipeTime(props) {
  return <span>{props.time}</span>;
}


function RecipeTimeSection(props) {
  return (
    <div>
      <section className='recipe-times'>
        <ul>
          <li id='prep-time'>
            <label>Prep Time: </label>
            <RecipeTime time={props.time.preparationMinutes} />
          </li>
          <li id='cook-time'>
            <label>Cook Time: </label>
            <RecipeTime time={props.time.cookingMinutes} />
          </li>
          <li id='ready-time'>
            <label>Ready In: </label>
            <RecipeTime time={props.time.readyInMinutes} />
          </li>
        </ul>
      </section>
    </div>
    );
}


function Ingredient(props){
  return (
    <li>{props.amount} {props.unit} {props.name} </li>
    );
}


function RecipeIngredients(props) {
  console.log('in recipe ingredients component');
  console.log(props.ingredients);

  return (
    <div>
      <section className='recipe-ingredients'>
        <label>Ingredients: </label>
          <ul>
            {props.ingredients.map((ingredient) => 
                <Ingredient key={props.ingredients.indexOf(ingredient)}
                            amount={ingredient.amount}
                            unit={ingredient.unit}
                            name={ingredient.name}
                  />
              )}
          </ul>
      </section>
    </div>
    );
}


// ***** Recipe Card components route to Recipe Details *****



function ClickableRecipeTitle(props) {

  const goToDetails = () => {

  }

  return(
    <h3 id='clickable-recipe-title'
        onClick={props.goToDetails()}>
            {props.title}
    </h3>
    );
}


function ClickableRecipeImage(props) {
  return(
    <img id='clickable-recipe-img'
         src={`${props.image}`} 
         onClick={props.goToDetails()} 
      />
    );
}


// ***** Buttons for Recipe Card and Recipe Details *****


function ToSaveBtn(props) {
  console.log('to save button component')

  const [buttonText, setButtonText] = React.useState('Save this recipe!')

  const handleClick = () => {
    props.addRecipe();
    setButtonText('Saved')
  };

  return (
    <button id='to-save-btn' 
            onClick={handleClick}>
      {buttonText}
    </button>
    );
}


function SavedBtn(props) {
  return (
    <button id='saved-btn'> Saved! </button>
    );
}


function ToFavoriteBtn(props) {
  return (
    <button id='favorited-btn'
            onClick={handleClick}> 
      Favorite! 
    </button>
    );
}

function FavoritedBtn(props) {
  return (
    <button id='favorited-btn'> Favorite! </button>
    );
}


function SearchResultButton(props) {
  console.log('in Button component');
  // isSaved is boolean passed from parent component
  let isSaved = props.isSaved;

  const addRecipeToSaved = () => {
    fetch('/api/save_a_recipe', 
            {method: 'POST',
              body: JSON.stringify({recipe_id: props.recipe_id}),
              headers: { 'Content-Type': 'application/json'},
              credentials:'include'
            })
    .then(res => res.json())
    .then(data => {alert(data.message);
                   props.setIsSaved(data.saved)
                 })
  };

  const addRecipeToDb = () => {
    fetch('/api/add_recipe', 
            {method: 'POST',
              body: JSON.stringify({recipe_details: props.recipe_details}), 
              headers: { 'Content-Type': 'application/json'},
              credentials:'include'
            })
    .then(res => res.json())
    .then(data => {alert(data.message);
                   if (data.success) {
                    addRecipeToSaved()
                    }
                  }
          )
  };

  return (
    <div>
      <section className='button'>
        {isSaved ? <SavedBtn /> : <ToSaveBtn addRecipe={addRecipeToDb} />}
      </section>
    </div>
    );
}


// ***** Components specific for Recipe Details (not shared with Recipe Card) *****


function StaticImg(props) {
  return (
    <img id='static-recipe-img' src={`${props.image}`} />
    );
}


function StaticTitle(props) {
  return (
    <h3 id='static-recipe-title'> {props.title}</h3>
    );
}


function Instructions(props) {
  return (
    <div>
    <section className='recipe-instructions'>
        <label>Instructions: </label>
          <ol>
            {props.instructions.map((instruction) => 
              <li key={props.instructions.indexOf(instruction)}>
                {instruction}
              </li>
              )}
          </ol>
        </section>
    </div>
    );
}


function SourceUrl(props) {
  return (
    <a href={`${props.sourceUrl}`}>
      Click for more details on recipe
    </a>
    );
}