// ***** User's Food For Thoughts Component *****

// ***** Tried component *****

function Tried(props) {
  let { id } = useParams();
  const {tried, setTried} = props;
  console.log(tried);

  const handleTried = (e) => {
    const values = {
      true: 'True',
      false: 'False'
    };
    const triedValue = values[e.target.value];
    fetch('/api/update_user_thoughts', {
    method: 'POST',
    body: JSON.stringify({tried: triedValue, recipe_id: id}),
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'
    })
    .then(res => res.json())
    setTried(e.target.value);
  };

  return (
    <div className='tried'>
      <label> Tried recipe? </label>
      <Button className='yes-tried' variant='primary' value={true} onClick={handleTried} active={tried ? true : false}> yes </Button>
      <Button className='no-tried' variant='primary' value={false} onClick={handleTried} active={!tried ? true : false}> no </Button>
    </div>
    );
}


// ***** Comment component *****

function Comment(props) {
  let { id } = useParams();
  const {comment, setComment} = props;
  const [newComment, setNewComment] = React.useState('');
  console.log(newComment);
  const handleComment = () => {
    fetch('/api/update_user_thoughts', {
    method: 'POST',
    body: JSON.stringify({comment: newComment, recipe_id: id}),
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'
    });
    setComment(newComment);
    setNewComment('')
  };
  
  return (
    <div className='comment'>
      <Form.Label> Recipe Comment: </Form.Label>
      <p> {comment} </p>
      <FormControl 
        className='comment' 
        as="textarea" 
        value={newComment}
        onChange={(e)=>{setNewComment(e.target.value)}}></FormControl>

        <Button variant='primary' type='submit' onClick={handleComment}>
          Save comment
        </Button>
    </div>
    );
}


// ***** 5-Star Rating component *****

function Rating(props) {
  let { id } = useParams();
  const {rating, setRating} = props;
  
  const STARS = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 }
  ];

  // font awesome icons 
  const STAR_TEXT = {
    filled: <i className="fas fa-star"></i>,
    unfilled: <i className="far fa-star"></i>
  };

  const handleRating = (e) => {
    // make array from 1 to selected value
    let newRating = [];
    for (let i = 1; i <= e.target.value; i += 1) {
      newRating.push(i)
    };
    // update stars with array of new rating
    setRating(newRating);
    
    fetch('/api/update_user_thoughts', {
      method: 'POST',
      body: JSON.stringify({rating: e.target.value, recipe_id: id}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
      })
  };

  return(
    <div className='rating'>
      <label>How'd it go?</label>
        <ButtonGroup toggle className='stars'>
          {STARS.map((star, idx) => (
            <ToggleButton key={idx}
                          type='checkbox'
                          variant='primary'
                          checked={rating.includes(star.value)}
                          value={star.value}
                          onChange={handleRating}
                          >
              {rating.includes(star.value) ? STAR_TEXT.filled : STAR_TEXT.unfilled}
            </ToggleButton> 

            ))}
        </ButtonGroup>
    </div>
    );
}


// ***** Food For Thoughts Container Component *****

function FoodForThoughtsContainer(props) {
  let { id } = useParams();
  const [tried, setTried] = React.useState(null);
  const [rating, setRating] = React.useState([]);
  const [comment, setComment] = React.useState('');
  // update state of each section from db data or set as default nulls
  React.useEffect(() => {
    fetch(`/api/user_thoughts/${id}`)
    .then(res => res.json())
    .then(data => {
      setTried(data.thoughts.tried);
      setRating(data.thoughts.rating);
      setComment(data.thoughts.comment);
    })
  },[]);

  return (
    <div className='user-thoughts-container container'>
      <h4> Food For Thoughts! </h4>

      <Tried tried={tried} setTried={setTried} />

      <br/>

      <Rating setRating={setRating} rating={rating} />

      <br/>

      <Comment comment={comment} setComment={setComment} />

      <br/>
    </div>
    );
}