// Recipe details components

function RecipeImage(props) {
  console.log('in recipe image');
  console.log(props.isSaved);

  let history = useHistory();

  const handleImgClick = () => {
    // pass isSaved to recipe-details, true means from saved recipes, false means from search results
    // this will be used for recipe-detail's get request
    history.push(`/recipe-details/${props.recipe_id}`, {isSaved: props.isSaved})
  };

  return (
      <img 
        src={`${props.image}`} id='recipe-img'
        onClick={handleImgClick}>
      </img>
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
        <RecipeTime time={props.time.preparationMinutes} />
      </li>
      <li>
        <label>Cook Time: </label>
        <RecipeTime time={props.time.cookingMinutes} />
      </li>
      <li>
        <label>Ready In: </label>
        <RecipeTime time={props.time.readyInMinutes} />
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
  
  const instructions = props.instructions.instructions;
  // console.log(instructions);
  const instructionsList = [];
  for (const instruction of instructions) {
    // console.log(instruction);
    instructionsList.push(<RecipeInstructionItem key={instructions.indexOf(instruction)} instructions={instruction} />)
  };
  // console.log(instructionsList);

  return (
    <div>
      <label>Instructions: </label>
        <ol>
          {instructionsList}
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
          {equipmentList.map((equipment) => <li>{equipment}</li>)
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
            <li>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
            )}
        </ul>
    </div>
    );
}


function RecipeDetails(props) {
  let {id} = useParams();
  console.log(props.isSaved);
  console.log(id);


  
  // React.useEffect(() =>{
  //   // GET request
  //   fetch(`/api/recipe_details/${id}`)

  // })

  return (
    <div> hello
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
//         : <SaveRecipeButton 
//             recipe_id={props.recipe_info.recipe_id} 
//             recipe_details={props}
//             isSaved={isSaved}
//             isFavorite={isFavorite}
//           />
//       }
//     </section>

//     <a href={`${props.recipe_info.sourceUrl}`}>For more details on recipe</a>
//   </section>
// </div>
