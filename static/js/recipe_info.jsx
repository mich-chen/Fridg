// ***** recipe components that are shared between recipe cards and recipe details *****

function RecipeServings(props) {
  return (
    <div className='servings'>
      Servings: {props.servings}
    </div>
  );
}


function RecipeTime(props) {
  return <span>{props.time} mins</span>;
}


function RecipeTimeSection(props) {
  return (
    <div className='recipe-times'>
        <div>
          <span className='prep-time time'>
            Prep: <RecipeTime time={props.times.prepMins} />
          </span>
          <span className='cook-time time'>
            Cook: <RecipeTime time={props.times.cookMins} />
          </span>
          <div className='ready-time time'>
            Ready In: <RecipeTime time={props.times.readyMins} />
          </div>
        </div>
    </div>
    );
}


// ***** Recipe Card components route to Recipe Details *****


function ClickableImg(props) {
  return (
    <Card.Img className='clickable-img clickable' 
         src={`${props.image}`} 
         onClick={props.onClick}
         variant='top'
      />
    );
}


function ClickableTitle(props) {
  return (
    <h3 className='clickable-title clickable'
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
    <div className='clickable-to-details'>
        {props.elementType === 'image' 
         ? <ClickableImg image={img} onClick={goToDetails} />
         : <ClickableTitle title={title} onClick={goToDetails} />
        }
    </div>
    );
}

// ***** Components specific for Recipe Details (not shared with Recipe Card) *****


function StaticImg(props) {
  return (
    <Image className='static-img' src={`${props.image}`} rounded/>
    );
}


function StaticTitle(props) {
  return (
    <h3 className='static-title'> {props.title}</h3>
    );
}


function Ingredient(props){
  return (
    <li>{props.amount} {props.unit} {props.name} </li>
    );
}


function RecipeIngredients(props) {
  return (
    <div className='recipe-ingredients'>
        <label><b>Ingredients: </b></label>
          <ul>
            {props.ingredients.map((ingredient) => 
                <Ingredient key={props.ingredients.indexOf(ingredient)}
                            amount={ingredient.amount}
                            unit={ingredient.unit}
                            name={ingredient.name}
                  />
              )}
          </ul>
    </div>
    );
}


function RecipeEquipment(props) {
  const equipmentList = [];
  for (const equipment in props.equipment) {
    equipmentList.push(equipment)
  };

  return (
    <div className='recipe-equipment'>
      <label><b>Equipment: </b></label>
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
    <div className='recipe-instructions'>
      <label><b>Instructions: </b></label>
        <ol>
          {props.instructions.map((instruction) => 
            <li key={props.instructions.indexOf(instruction)}>
              {instruction}
            </li>
            )}
        </ol>
    </div>
    );
}


function SourceUrl(props) {
  return (
    <a className='sourceUrl' href={`${props.url}`}>
      Click for more details on recipe
    </a>
    );
}


// ***** Recipe Card as Parent Component to Recipe Details *****


function RecipeCard(props) {
  // pass data as props to children and Recipe Details component
  // parent is either Search Results or Saved Recipes
  const {loggedIn} = React.useContext(AuthContext);
  const {servings, prepMins, cookMins, readyMins, buttonStatus, handleRemove, alertProps, ...others} = props;

  // enum to conditionally render buttons by path name and button status
  const getButton = (status, loggedIn) => ({
    'saved-recipes':(<div>
                      <SavedRecipesButton 
                        buttonStatus={status}
                        recipeId={props.recipeId} />

                      <RemoveBtn recipeId={props.recipeId}
                                 handleRemove={handleRemove} />
                    </div>
                    ),
    'search-results': (loggedIn ? <SearchResultButton 
                                    buttonStatus={status}
                                    recipeDetails={props.recipeDetails}
                                    recipeId={props.recipeId} />
                                : <ModalButton text={'Save this recipe!'}
                                               alertProps={alertProps} />)
  });

  return (
    <Card className='recipe-card'>
        <ClickableToDetails {...others} elementType='image' />
        <Card.Body>
          <Card.Title>
            <ClickableToDetails {...others} elementType='title' />
          </Card.Title>

          <RecipeServings servings={servings}/>

          <RecipeTimeSection times={{prepMins, cookMins, readyMins}}/>
        </Card.Body>

        <Card.Footer>
          {getButton(buttonStatus, loggedIn)[props.fromPath]}
        </Card.Footer> 
    </Card>  
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
          setButtonStatus(data.recipe_details.favorite)
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
  console.log(buttonStatus);

  const prepMins = details.prep_mins;
  const cookMins = details.cooking_mins;
  const readyMins = details.ready_mins;

  // enum to conditionally render buttons by path name and button status
  const getButtons = (status, loggedIn) => ({
      'saved-recipes':(<div>
                        <Row style={{'justify-content': 'center'}}>
                          <SavedRecipesButton 
                            buttonStatus={status}
                            recipeId={details.recipe_id} />
                          <RemoveBtn recipeId={details.recipe_id} />
                        </Row>
                      </div>
                      ),
      'search-results': (loggedIn ? <div>
                                      <SearchResultButton 
                                        buttonStatus={status}
                                        recipeDetails={details}
                                        recipeId={details.recipe_id} />
                                    </div>
                          : <ModalButton text={'Log in to Save!'}
                                         alertProps={props.alertProps} />
                        )
    });

  return (
    <Container className='recipe-details'>
      <Row>
        <Col className='img-times-servings' md={{span: 6, offset: 3}}>
          <StaticImg image={details.image} />
          <StaticTitle title={details.title} />
          <RecipeTimeSection times={{prepMins, cookMins, readyMins}} />

          <RecipeServings servings={details.servings} />

          {getButtons(buttonStatus, loggedIn)[fromPath]}
        </Col>
      </Row>

      <Row className='details-row'>
        <Col className='ingr-equip details'>
          <RecipeIngredients ingredients={details.ingredients} />
          <RecipeEquipment equipment={details.equipment} />
        </Col>

        <Col className='missing-or-thoughts details'>
            {details.hasOwnProperty('missing_ingredients') ? 
              <MissingIngredientsContainer missingIngredients={details.missing_ingredients} 
                                           title={details.title}
                                           alertProps={props.alertProps} />
              : null
            }

            {fromPath === 'saved-recipes' ? <FoodForThoughtsContainer />: null}
        </Col>
      </Row>
           
      <Row className='details-row'>
        <Col className='recipe-instructions details'>
          <RecipeInstructions instructions={details.instructions} />
          <SourceUrl url={details.sourceUrl} />
        </Col>
      </Row>
    </Container>
    );
}
