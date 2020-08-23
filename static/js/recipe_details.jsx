// Recipe details components

function RecipeImage(props) {
  console.log('in recipe image');
  // console.log(props.isSaved);
  // console.log('recipe details in img component', props.recipeDetails);

  let history = useHistory();

  const handleImgClick = () => {
    // pass isSaved to recipe-details, true means from saved recipes, false means from search results
    // this will be used for recipe-detail's get request
    history.push({pathname: `/recipe-details/${props.recipe_id}`, 
                  state:{isSaved: props.isSaved,
                        recipeDetails: props.recipeDetails
                        }
                  } 
      );
  };

  return (
      <img 
        src={`${props.image}`} id='recipe-img'
        onClick={handleImgClick}>
      </img>
    );
}


function StaticRecipeImg(props) {
  return(
    <img id='static-recipe-img'
         src={props.image}>
    </img>
    );
}


function RecipeTitle(props) {
  return(
    <h3 id='recipe-title'>{props.title}</h3>
    );
}

function RecipeTime(props) {
  return <span>{props.time}</span>;
}


function RecipeTimeSection(props) {
  return (
    <ul>
      <li>
        <label>Prep Time: </label>
        <RecipeTime time={props.times.preparationMinutes} />
      </li>
      <li>
        <label>Cook Time: </label>
        <RecipeTime time={props.times.cookingMinutes} />
      </li>
      <li>
        <label>Ready In: </label>
        <RecipeTime time={props.times.readyInMinutes} />
      </li>
    </ul>
    );
}


function RecipeServings(props) {
  return (
    <div>
      <label>Servings: </label>
      {props.servings}
    </div>
  );
}

function RecipeInstructionItem(props) {
  return <li>{props.instructions}</li>;
}


function RecipeInstructions(props) {
  // list of instructions (in order)
  
  // const instructionsList = [];
  // for (const instruction of props.instructions) {
  //   instructionsList.push(<RecipeInstructionItem 
  //                         key={instructions.indexOf(instruction)}
  //                         instructions={instruction} />
  //                       )
  // };

  return (
    <div>
      <label>Instructions: </label>
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


function RecipeEquipment(props) {
  console.log('in recipe equipment component');
  console.log(props.equipment);

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


function RecipeIngredients(props) {
  console.log('in recipe ingredients component');
  console.log(props.ingredients);

  return (
    <div>
      <label>Ingredients: </label>
        <ul>
          {props.ingredients.map((ingredient) => 
            <li key={props.ingredients.indexOf(ingredient)}>
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </li>
            )}
        </ul>
    </div>
    );
}


function RecipeDetails(props) {
  console.log('in recipe details component');
  let {id} = useParams();
  let location = useLocation(); 

 
  console.log(id);
  // console.log('in recipe details, check saved', location.state.isSaved);
  // console.log('recipe details in details component', location.state.recipeDetails);

  // const isSaved = location.state.isSaved
  // const recipeDetails = location.state.recipeDetails

  let details = location.state.recipeDetails;

  // React.useEffect(() =>{
  //   // if recipe is stored in db GET request
  //   if (props.isSaved === true) {
  //     fetch(`/api/get_recipe_details/${id}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       alert(data.message);
  //       details = data.recipe_details;
  //     })
  //   } else {
  //     console.log('in use effect\'s else statement');
  //     details = location.state.recipeDetails
  //   };
  // }, [id]);

  console.log(details);

  return (
    <div> 
      <section className='recipe-img'>
        <StaticRecipeImg image={details.recipe_info.image} />
      </section>

      <RecipeTitle title={details.recipe_info.title} />

      <RecipeTimeSection times={details.recipe_times} />

      <RecipeServings servings={details.recipe_info.servings} />

      <RecipeIngredients ingredients={details.recipe_ingredients} />

      <RecipeEquipment equipment={details.recipe_equipment} />

      <RecipeInstructions instructions={details.recipe_instructions} />

      <a href={`${details.recipe_info.sourceUrl}`}>Click for more details on recipe</a>
    </div>
    );
}

// <div>
//   <section id='recipe-card'>
//     <section id='recipe-img'>
//       <RecipeImage image={props.recipe_info.image} />
//     </section>

//     <h3>{props.recipe_info['title']}</h3>

//     <section id="times-section">
//         <RecipeTimeSection time={props.recipe_times} />
//     </section>

//     <RecipeServings servings={props.recipe_info.servings} />

//     <RecipeIngredients ingredients={props.recipe_info.ingredients} />

//     <RecipeEquipment equipment={props.recipe_equipment} />

//     <section id="recipe-instructions">
//         <RecipeInstructions instructions={props.recipe_instructions} />
//     </section>

//     <section id="save-button">
//       {
//         props.renderingFrom === 'SavedRecipes'
//         ? <FavoriteButton 
//             recipe_id={props.recipe_info.recipe_id} 
//             recipe_details={props}
//             isFavorite={isFavorite}
//           />
//       }
//     </section>

//     <a href={`${props.recipe_info.sourceUrl}`}>For more details on recipe</a>
//   </section>
// </div>
