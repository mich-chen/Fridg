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
            <RecipeTime time={props.times.preparationMinutes} />
          </li>
          <li id='cook-time'>
            <label>Cook Time: </label>
            <RecipeTime time={props.times.cookingMinutes} />
          </li>
          <li id='ready-time'>
            <label>Ready In: </label>
            <RecipeTime time={props.times.readyInMinutes} />
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
  let history = useHistory();

  const goToDetails = () => {
    history.push({pathname: `/recipe-details/${props.recipe_id}`,
                  state: {isSaved: props.isSaved,
                          recipeDetails: props.recipeDetails}
                  })
  };

  return(
    <h3 id='clickable-recipe-title'
        onClick={goToDetails}>
          {props.title}
    </h3>
    );
}


function ClickableRecipeImage(props) {
  let history = useHistory();

   const goToDetails = () => {
    history.push({pathname: `/recipe-details/${props.recipe_id}`,
                  state: {isSaved: props.isSaved,
                          recipeDetails: props.recipeDetails}
                  })
  };

  return(
    <img id='clickable-recipe-img'
         src={`${props.image}`} 
         onClick={goToDetails} 
      />
    );
}


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


function ClickableToDetails(props) {
  //props.element will be what to render, either image or title

  let history = useHistory();

  const goToDetails = () => {
    history.push({pathname: `/recipe-details/${props.recipeId}`,
                  state: {isSaved: props.isSaved,
                          setIsSaved: props.setIsSaved,
                          isFavorite: props.isFavorite,
                          setIsFavorite: props.setIsFavorite,
                          recipeDetails: props.recipeDetails}
                  })
  };

  return(
    {type === 'image' ? <StaticImg image={props.element} onClick={goToDetails} />
     : <StaticTitle title={props.element} onClick={goToDetails} />
      }
    );
}


// ***** Buttons for Recipe Card and Recipe Details *****


function ActionBtn(props) {
  // pass initial text, updated text, and action as props
  console.log('in action button component');

  const initialText = props.initialText;

  const [buttonText, setButtonText] = React.useState(initialText);

  const handleClick = () => {
    props.action();
    setButtonText(updateText)
  };

  return (
    <button id='action-btn'
            onClick={handleClick}> 
      {buttonText}
    </button>
    );
}


function ToSaveBtn(props) {
  console.log('to save button component');

  const [buttonText, setButtonText] = React.useState('Save this recipe!');

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


function SearchResultButton(props) {
  console.log('in search results Button component');
  // isSaved is boolean passed from parent component
  let isSaved = props.isSaved;

  const addRecipeToSaved = () => {
    fetch('/api/save_a_recipe', 
            {method: 'POST',
              body: JSON.stringify({recipe_id: props.recipeId}),
              headers: { 'Content-Type': 'application/json'},
              credentials:'include'
            })
    .then(res => res.json())
    .then(data => {alert(data.message);
                   props.setIsSaved(data.success) //success is boolean
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


function ToFavoriteBtn(props) {
  console.log('to favorite button component');

  const [buttonText, setButtonText] = React.useState('Saved! Not favorited!');

  const handleClick = () => {
    props.favoriteThisRecipe();
    setButtonText('Favorite <3')
  };

  return (
    <button id='favorited-btn'
            onClick={handleClick}> 
      {buttonText}
    </button>
    );
}


function FavoritedBtn(props) {

  const text = 'Favorite <3';

  return (
    <button id='favorited-btn'> {text}  </button>
    );
}


function SavedRecipesButton(props) {
  console.log('in saved recipes buttons component');

  let isFavorite = props.isFavorite;

  const favoriteThisRecipe = () => {
    console.log('in adding favorite component to server');
    fetch('/api/favorite_a_recipe', 
            {method: 'POST',
              body: JSON.stringify({recipe_id: props.recipeId}),
              headers: { 'Content-Type': 'application/json'},
              credentials:'include'
            })
    .then(res => res.json())
    .then(data => {alert(data.message);
                    props.setIsFavorite(data.success) // success is boolean
                  })
  };

  return (
    <div>
      <section className='button'
        {isFavorite ? <FavoritedBtn /> 
          : <ActionBtn action={favoriteThisRecipe}
                       initialText={'Saved! Not favorited!'}
                       updateText={'Favorite <3'}
                       />}
      </section>
    </div>
    );
}

// ***** Components specific for Recipe Details (not shared with Recipe Card) *****


function RecipeEquipment(props) {
  const equipmentList = [];
  for (const equipment in props.equipment) {
    console.log(equipment);
    equipmentList.push(equipment)
  }

  return (
    <div>
      <label>Equipment: </label>
        <ul>
          {equipmentList.map((equipment) => 
            <li key={equipmentList.indexOf(equipment)}>
              {equipment}
            </li>)
          }
        </ul>
    </div>
    );
}


function RecipeInstructions(props) {
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
    <a href={`${props.url}`}>
      Click for more details on recipe
    </a>
    );
}


// ***** Recipe Details as Parent Component *****


function RecipeDetails(props) {
  // recipe's full information will be passed from ClickableToDetails (parent) and grandparant is Recipe Card
  // clickable image and title will history.push() here
  let {id} = useParams();
  let location = useLocation();

  let details = location.state.recipeDetails;

  return (
    <div>
      <section className='recipe-details'>

        <StaticImg image={details.recipe_info.image}/>

        <StaticTitle title={details.recipe_info.title}/>

        <RecipeTimeSection times={details.recipe_times}/>

        <RecipeServings servings={details.recipe_info.servings}/>

        <RecipeIngredients ingredients={details.recipe_ingredients}/>

        <RecipeEquipment equipment={details.recipe_equipment}/>

        <RecipeInstructions instructions={details.recipe_instructions}/>

        <SavedRecipesButton recipeId={details.recipe_info.recipe_id}
                            isFavorite={details.recipe_info.favorite}
                            setIsFavorite={details.setIsFavorite}
                             />
                            

        <SearchResultButton recipeId={details.recipe_info.recipe_id}
                            recipeDetails={details}
                            isSaved={details.isSaved}
                            setIsSaved={details.setIsSaved}
                            />

        <SourceUrl url={details.recipe_info.sourceUrl}/>

      </section>
    </div>
    );
}


// ***** Recipe Card as Parent Component to Recipe Details *****


function RecipeCard(props) {
  // pass data as props to children and Recipe Details component
  // parent is either Search Results or Saved Recipes

  // const Button = props.button;
  
  return (
    <div>
      <section className='recipe-card'>

        <ClickableToDetails type={'image'} 
                            recipeId={props.recipe_info.recipe_id}
                            isSaved={props.isSaved}
                            setIsSaved={props.setIsSaved}
                            isFavorite={props.isFavorite}
                            setIsFavorite={props.setIsFavorite}
                            recipeDetails={props.recipeDetails}/>

        <ClickableToDetails type={'title'}
                            recipeId={props.recipe_info.recipe_id}
                            isSaved={props.isSaved}
                            setIsSaved={props.setIsSaved}
                            isFavorite={props.isFavorite}
                            setIsFavorite={props.setIsFavorite}
                            recipeDetails={props.recipeDetails}/>

        <RecipeServings servings={props.recipe_info.servings}/>

        <RecipeTimeSection times={props.recipe_times}/>

        <RecipeIngredients ingredients={props.recipe_ingredients}/>

        <SavedRecipesButton recipeId={props.recipe_info.recipe_id}
                            isFavorite={props.isFavorite}
                            setIsFavorite={props.setIsFavorite}
                             />               

        <SearchResultButton recipeId={props.recipe_info.recipe_id}
                            recipeDetails={props}
                            isSaved={props.isSaved}
                            setIsSaved={props.setIsSaved}
                            />

      </section>
    </div>
    );
}


function RecipeCardList(props) {
  // list of search results checked if saved, dict key called is_saved (boolean)
  const recipesList = props.checkedRecipes;

  const initialSaved = recipesList.is_saved;
  const initialFavorite = props.isFavorite;
  const [isSaved, setIsSaved] = React.useState(initialSaved);
  const [isFavorite, setIsFavorite] = React.useState(initialFavorite);

  return (
    <div>
      <section id="search-results">
        <ul>
          {(recipesList.map((recipe) => 
              <RecipeCard key={recipe.recipe_info.recipe_id}
                          recipe_info={recipe.recipe_info}
                          recipe_times={recipe.recipe_times}
                          recipe_ingredients={recipe.recipe_ingredients}
                          recipe_instructions={recipe.recipe_instructions}
                          recipe_equipment={recipe.recipe_equipment} 
                          isSaved={isSaved}
                          setIsSaved={setIsSaved}
                          isFavorite={isFavorite}
                          setIsFavorite={setIsFavorite}
                />)) 
          } 
        </ul>
      </section>
    </div>

    <RecipeCard />
    );
}