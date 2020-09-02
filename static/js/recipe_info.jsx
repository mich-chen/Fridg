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
            <RecipeTime time={props.times.prepMins} />
          </li>
          <li id='cook-time'>
            <label>Cook Time: </label>
            <RecipeTime time={props.times.cookingMins} />
          </li>
          <li id='ready-time'>
            <label>Ready In: </label>
            <RecipeTime time={props.times.readyMins} />
          </li>
        </ul>
      </section>
    </div>
    );
}


// ***** Recipe Card components route to Recipe Details *****


function ClickableImg(props) {
  return (
    <img id='clickable-recipe-img' 
         src={`${props.image}`} 
         onClick={props.onClick}
      />
    );
}


function ClickableTitle(props) {
  return (
    <h3 id='clickable-recipe-title'
        onClick={props.onClick}> 
          {props.title}
    </h3>
    );
}


function ClickableToDetails(props) {
  let history = useHistory();
  const {img, title, elementType, element, fromPath, recipeId, ...others} = props;

  const goToDetails = () => {
    history.push({pathname: `/${fromPath}/recipe-details/${recipeId}`,
                  state: {...others}
                })
  };

  return (
    <div>
      <section className='clickable-to-details'>
        {props.elementType === 'image' 
         ? <ClickableImg image={img} onClick={goToDetails} />
         : <ClickableTitle title={title} onClick={goToDetails} />
        }
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


function Ingredient(props){
  return (
    <li>{props.amount} {props.unit} {props.name} </li>
    );
}


function RecipeIngredients(props) {
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


function RecipeEquipment(props) {
  const equipmentList = [];
  for (const equipment in props.equipment) {
    equipmentList.push(equipment)
  };

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
  const {servings, prepMins, cookMins, readyMins, buttonStatus, ...others} = props;

  // enum to conditionally render buttons by path name and button status
  const getButton = (status, loggedIn) => ({
    'saved-recipes':(<div>
                      <SavedRecipesButton 
                        buttonStatus={status}
                        recipeId={props.recipeId} />

                      <RemoveBtn recipeId={props.recipeId} />
                    </div>
                    ),
    'search-results': (loggedIn ? <SearchResultButton 
                                    buttonStatus={status}
                                    recipeDetails={props.recipeDetails}
                                    recipeId={props.recipeId} />
                                : <ModalButton />)
  });

  return (
    <div>
      <section className='recipe-card'>

        <ClickableToDetails {...others} elementType='image' />

        <ClickableToDetails {...others} elementType='title' />

        <RecipeServings servings={servings}/>

        <RecipeTimeSection times={{propMins, cookMins, readyMins}}/>           

        {getButton(buttonStatus, loggedIn)[props.fromPath]}

      </section>
    </div>
    );
}


// ***** Recipe Details *****


function RecipeDetails(props) {
  let { id, fromPath } = useParams();
  let location = useLocation();
  const {loggedIn, setLoggedIn} = React.useContext(AuthContext);
  const {recipeDetails, ...others} = location.state;
  // set initial state as recipe details from props
  const [details, setDetails] = React.useState(recipeDetails);
  const [buttonStatus, setButtonStatus] = React.useState(false);

  // if logged-in, fetch data for details and button status from server
  React.useEffect(() => {
    if (fromPath === 'saved-recipes') {
      fetch(`/api/saved_recipe_details/${id}`)
        .then(res => res.json())
        .then(data => {
          setDetails(data.recipe_details);
          setButtonStatus(data.favorite)
          })
    } else {
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
    };
  }, [buttonStatus]);
  console.log('recipes details', details);

  // enum to conditionally render buttons by path name and button status
  const getButtons = (status, loggedIn) => ({
      'saved-recipes': (<div>
                          <SavedRecipesButton 
                            buttonStatus={status}
                            recipeId={details.recipe_id} />
                          <RemoveBtn 
                            recipeId={details.recipe_id} />
                        </div>
                        ),
      'search-results': (loggedIn ? <div>
                                      <SearchResultButton 
                                        buttonStatus={status}
                                        recipeDetails={details}
                                        recipeId={details.recipe_id} />
                                      <RemoveBtn 
                                        ecipeId={details.recipe_id} />
                                    </div>
                                  : <ModalButton text={'Log in to Save!'}/>
                        )
    });

  return (
    <div>
      <section className='recipe-details'>

        {fromPath === 'saved-recipes' ? <FoodForThoughtsContainer /> : null}

        <StaticImg image={details.image} />

        <StaticTitle title={details.title} />

        <RecipeTimeSection times={{details.prep_mins, details.cook_mins, details.ready_mins}} />

        <RecipeServings servings={details.servings} />

        <RecipeIngredients ingredients={details.ingredients} />

        {details.hasOwnProperty('missing_ingredients') ? 
          <MissingIngredientsContainer missingIngredients={details.missing_ingredients} title={details.title}/>
          : null
        }

        <RecipeEquipment equipment={details.equipment} />

        <RecipeInstructions instructions={details.instructions} /> 

        {getButtons(buttonStatus, loggedIn)[fromPath]}

        <SourceUrl url={details.sourceUrl} />

      </section>
    </div>
    );
}
