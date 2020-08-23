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
  let history = useHistory();

  const goToDetails = () => {
    history.push({pathname: `/recipe-details/${props.recipeId}`,
                  state: {button: props.button}
                })
  };

  return (
    <div>
      {props.elementType === 'image' ? <StaticImg image={props.element} 
                                     onClick={goToDetails} 
                                     />
       : <StaticTitle title={props.element} 
                      onClick={goToDetails} 
                      />
        }
    </div>
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
    setButtonText(props.updateText)
  };

  return (
    <button id='action-btn'
            onClick={handleClick}> 
      {buttonText}
    </button>
    );
}


// function ToSaveBtn(props) {
//   console.log('to save button component');

//   const [buttonText, setButtonText] = React.useState('Save this recipe!');

//   const handleClick = () => {
//     props.addRecipe();
//     setButtonText('Saved')
//   };

//   return (
//     <button id='to-save-btn' 
//             onClick={handleClick}>
//       {buttonText}
//     </button>
//     );
// }


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


// function ToFavoriteBtn(props) {
//   console.log('to favorite button component');

//   const [buttonText, setButtonText] = React.useState('Saved! Not favorited!');

//   const handleClick = () => {
//     props.favoriteThisRecipe();
//     setButtonText('Favorite <3')
//   };

//   return (
//     <button id='favorited-btn'
//             onClick={handleClick}> 
//       {buttonText}
//     </button>
//     );
// }


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


// ***** Recipe Card as Parent Component to Recipe Details *****


function RecipeCard(props) {
  // pass data as props to children and Recipe Details component
  // parent is either Search Results or Saved Recipes
  // props.button will be different component depending on parent
  const Button = React.cloneElement(props.button, {
            recipeId: props.recipeInfo.recipe_id,
            recipeDetails: props.recipeDetails
          });

  return (
    <div>
      <section className='recipe-card'>

        <ClickableToDetails elementType={'image'}
                            recipeId={props.recipeInfo.recipe_id}
                            element={props.recipeInfo.image}
                            button={Button}
                            />

        <ClickableToDetails elementType={'title'}
                            recipeId={props.recipeInfo.recipe_id}
                            element={props.recipeInfo.title}
                            button={Button}
                            />

        <RecipeServings servings={props.recipeInfo.servings}/>

        <RecipeTimeSection times={props.recipeTimes}/>

        <RecipeIngredients ingredients={props.recipeIngredients}/>           

        {Button}

      </section>
    </div>
    );
}


// ***** Recipe Details *****


function RecipeDetails(props) {
  // clickable image and title will history.push() here
  let {id} = useParams();
  let location = useLocation();

  const Button = location.state.button;

  let details = {};

  fetch(`/api/recipe_details/${id}`)
  .then(res => res.json())
  .then(data => details = data);

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

        {Button}

        <SourceUrl url={details.recipe_info.sourceUrl}/>

      </section>
    </div>
    );
}


// function RecipeCardList(props) {
//   // list of search results checked if saved, dict key called is_saved (boolean)
//   const recipesList = props.recipesList;

//   // const initialSaved = recipesList.is_saved;
//   // const initialFavorite = props.isFavorite;
//   // const [isSaved, setIsSaved] = React.useState(initialSaved);
//   // const [isFavorite, setIsFavorite] = React.useState(initialFavorite);

//   return (
//     <div>
//       <section id="search-results">
//         <ul>
//           {(recipesList.map((recipe) => 
//               <RecipeCard key={recipe.recipe_info.recipe_id}
//                           recipe_info={recipe.recipe_info}
//                           recipe_times={recipe.recipe_times}
//                           recipe_ingredients={recipe.recipe_ingredients}
//                           recipe_instructions={recipe.recipe_instructions}
//                           recipe_equipment={recipe.recipe_equipment} 
//                           isSaved={props.isSaved}
//                           // setIsSaved={setIsSaved}
//                           isFavorite={props.isFavorite}
//                           // setIsFavorite={setIsFavorite}
//                           button={props.button}
//                 />)) 
//           } 
//         </ul>
//       </section>
//     </div>

//     <RecipeCard />
//     );
// }