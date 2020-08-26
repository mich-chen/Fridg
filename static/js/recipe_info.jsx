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


function ClickableImg(props) {
  return (
    <img id='clickable-recipe-img' 
         src={`${props.image}`} 
         onClick={props.onClick}
      />
    );
}


function ClickableTitle(props) {
  console.log('clickable title');
  return (
    <h3 id='clickable-recipe-title'
        onClick={props.onClick}> 
          {props.title}
    </h3>
    );
}


function ClickableToDetails(props) {
  let history = useHistory();

  // const Button = React.cloneElement(props.button);

  const goToDetails = () => {
    console.log('in go to details func');
    history.push({pathname: `/${props.fromPath}/recipe-details/${props.recipeId}`,
                  state: {recipeDetails: props.recipeDetails}
                })
  };

  return (
    <div>
      <section className='clickable-to-details'>
        {props.elementType === 'image' ? <ClickableImg image={props.element}                                          onClick={goToDetails}
                                       />
         : <ClickableTitle title={props.element} 
                        onClick={goToDetails}
                        />
          }
      </section>
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


function StaticButton(props) {
  // Button to render if user is not logged in
  return (
    <button id='static-btn'> Log In To Save! </button>
    );
}


function SavedBtn(props) {
  return (
    <button id='saved-btn'> Saved! </button>
    );
}


function FavoritedBtn(props) {
  const text = 'Favorited &hearts;';

  return (
    <button id='favorited-btn'> Favorited &hearts;  </button>
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
      .then(res => res.json())
      .then(data => {
        console.log(data.message, data.success)
      })
      .then(toggleBtn)
  }

  const handleClick = () => {
    if (window.confirm('Are you sure you want to remove this recipe?')) {
      console.log('confirmed remove recipe')
      removeRecipe();
    }
  };

  return (
    <button id='remove-btn' onClick={handleClick}> 
      Remove Recipe
    </button>
    );
}


function SearchResultButton(props) {
  console.log('in search results Button component');
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


function SavedRecipesButton(props) {
  console.log('in saved recipes buttons component');

  let isFavorite = props.buttonStatus;

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
  const {loggedIn} = React.useContext(AuthContext);

  // enum to conditionally render buttons by path name and button status
  const getButton = (status, loggedIn) => ({
      'saved-recipes': <SavedRecipesButton buttonStatus={status}
                                           recipeDetails={props.recipeDetails}
                                           recipeId={props.recipeId} />,
      'search-results': (loggedIn ? <SearchResultButton buttonStatus={status}
                                                        recipeDetails={props.recipeDetails}
                                                        recipeId={props.recipeId} />
                                  : <StaticButton />)
    });

  return (
    <div>
      <section className='recipe-card'>

        <ClickableToDetails elementType={'image'}
                            recipeDetails={props.recipeDetails}
                            fromPath={props.fromPath}
                            recipeId={props.recipeId}
                            element={props.recipeImg}
                            />

        <ClickableToDetails elementType={'title'}
                            recipeDetails={props.recipeDetails}
                            fromPath={props.fromPath}
                            recipeId={props.recipeId}
                            element={props.recipeTitle}
                            />

        <RecipeServings servings={props.recipeServings}/>

        <RecipeTimeSection times={props.recipeTimes}/>

        <RecipeIngredients ingredients={props.recipeIngredients}/>           

        {getButton(props.buttonStatus, loggedIn)[props.fromPath]}

      </section>
    </div>
    );
}


// ***** Recipe Details *****


function RecipeDetails(props) {
  // clickable image and title will history.push() here
  let { id } = useParams();
  let { fromPath } = useParams();
  let location = useLocation();

  console.log('from path', fromPath);

  const [details, setDetails] = React.useState(location.state.recipeDetails);
  const [buttonStatus, setButtonStatus] = React.useState(false);

  const {loggedIn, setLoggedIn} = React.useContext(AuthContext);
  console.log('recipe details auth', loggedIn);



  // if logged-in user, fetch data for details and button status from server
  React.useEffect(() => {
    if (fromPath === 'saved-recipes') {
      console.log('in saved-recipes fetch');
      fetch(`/api/saved_recipe_details/${id}`)
        .then(res => res.json())
        .then(data => {
          // alert(data.message);
          setDetails(data.recipe_details);
          setButtonStatus(data.recipe_details.recipe_info.favorite)
          })
    } else if (fromPath === 'search-results' && loggedIn) {
      console.log('in else if user-search-recipes fetch');
      fetch('/api/check_results',
            {method: "POST",
             body: JSON.stringify({results_list: [details]}),
             headers: { 'Content-Type': 'application/json'},
             credentials:'include'
            })
        .then(res => res.json())
        .then(data => {
          setDetails(data.checked_recipes[0]);
          setButtonStatus(data.checked_recipes[0].is_saved)
          })
    } else {
      console.log('recipe details else statement');
      console.log(details);
      setButtonStatus(details.is_saved)
    };
  }, [buttonStatus]);

  console.log('recipes details', details);
  console.log('button status in details', buttonStatus)

  // enum to conditionally render buttons by path name and button status
  const getButtons = (status, loggedIn) => ({
      'saved-recipes': (<div>
                          <SavedRecipesButton buttonStatus={status}
                                              recipeDetails={details}
                                              recipeId={details.recipe_info.recipe_id} />
                          <RemoveBtn recipeId={details.recipe_info.recipe_id} />
                        </div>
                        ),
      'search-results': (loggedIn ? <div>
                                      <SearchResultButton buttonStatus={status}
                                                          recipeDetails={details}
                                                          recipeId={details.recipe_info.recipe_id} />
                                      <RemoveBtn recipeId={details.recipe_info.recipe_id} />
                                    </div>
                          
                          : <StaticButton />)
    });


  return (
    <div>
      <section className='recipe-details'>

        <StaticImg image={details.recipe_info.image} />

        <StaticTitle title={details.recipe_info.title} />

        <RecipeTimeSection times={details.recipe_times} />

        <RecipeServings servings={details.recipe_info.servings} />

        <RecipeIngredients ingredients={details.recipe_ingredients} />

        <RecipeEquipment equipment={details.recipe_equipment} />

        <RecipeInstructions instructions={details.recipe_instructions} /> 

        {getButtons(buttonStatus, loggedIn)[fromPath]}

        <SourceUrl url={details.recipe_info.sourceUrl} />

      </section>
    </div>
    );
}
