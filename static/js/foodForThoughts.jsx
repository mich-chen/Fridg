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
    <div className='tried thoughts'>
      <label> Tried it? </label>
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
    <div className='comment thoughts'>
      <Form.Label> Recipe Comment: </Form.Label>
      <p> {comment} </p>
      <FormControl 
        className='comment' 
        as="textarea" 
        value={newComment}
        onChange={(e)=>{setNewComment(e.target.value)}}
        placeholder='Journal your thoughts here!'></FormControl>

        <Button variant='primary' type='submit' onClick={handleComment}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEaUlEQVR4nO2bW0wcVRzGf/9ZVmggUhabAloxKGhT0JZGX5qY2iXQ0ia+tKlp0ieN0Sb6YGtjoaGrITHpAw+aeEl8a7amAWICrFQp2KTBNCXUC216QwpqoVpBLtsChZ3jA+xW2Vl3gdkdFvaXbHJmzplvv/PNOWf2MiNEQGnp/lQ9abxEafKkppQ9kmOsQil1X0T7JUWbONPY2HgvXHsJV19SvucQoiqBdHMsxoxhgeoWT10NoEI1soWqcLlcWlLqI26Ed4CUaDiMMilAad7T6/N7rl/5KlSjkCOgpHzPu4g67t/OyV7LpueKSEtLM9mnuXi9Xn74qYv+gT8C+5TIwdam2hqj9oYBlJbuT9Xt47eYHfY7ypy89car2O1LevoHmJqa4qNPvuB0S5t/1/AqbfJRozVBMxJQ9gkns53Pyc6Kq84D2O123j7wGtlZa/27Vt/zJW8zamscAKrAXy7e+Gxcdd6P3W6neGPRgx2aFBi1MwwAITDRMzLibfF/gMORESgL6mGjNsYBrCASAVhtwGoSAVhtwGoSAVhtwGoSAVhtwGpWfABJZgn1Tdzhze7PuTU5ZJakIY8lZ/Jp/us8nrzGFD3TRsDZkUtR7zzA75ODnB2+bJqeaQFsTS9kXXKmWXIhWZecydbVG0zTM20K5Kasoamw0iy5mLHiF8FEAFYbsBrT1gAdxdeDnfw5NbooHU2El9ILyU3572VOR9E8dBGAckcxEvYvjcgwLQDPYCdHe0+aolV35/ugBbV56CIVN92B7Z2Ozaa8l2lTwJzzEXtMGwHlmZsREbrHBxals0p7iO2OTcH6jmIABGGHQf1CMS0ADTFtWBohUdJf8VeBRABWG7CaRABWG7CaRABWG7CaRABWG7Aa4wB0pv3F6alpwybLBeMANBW4w+hm368xM2MFhgFowjl/uaPzR65e746doxhjGMC3jfVXldAG4PP5OFJVTfM3rQwO/R1bdzEg5LdBfVoO2GzqPLDa671LzcefxdBWZORkZ3Gs8hB5T+QuWCPkVeC707XXdJEyoH/B6lGmf+A2hyvep6e3b8Ea/3sZbGuqvTBuu/+MEipQ0gF4F/xOUWJkdGxRIYT9QaS9oWEM+HD2tWQo2bl3PfjagKyR0TEOvneM49VV5D+VNy+duP0gdMZz6grYtgG3Abzeuxw++gE3unvmpRO3AYA5IcR1ALD4EOI+AJgJQdlUGfAXzIRwpKqa3r7fwh67LAIAaG2o/xlsLzI7EkZGxzjXfj7sccsmAAieDpGwrAKA+Yew7AKA4DUBQIHhE2TLMgCYWROUTTmBGwjXlK6fstpTggQJlh4R39fgcrm09o6ufQAtnno3cx5HdZbvLRD0l0XU0ltYlfRveWGD2+Vy6XOrIr4/oL2ja59CTgA4d+1WrU117n/Xi/iagbyQD+laiSjaL1wGODG3aumdrWghuuG5iXgEtHjq3c5du5Xoolo9tV8G6Yvarit5RSB1MT6jgaAubXm+6GSLpz6o7h/kgV49+2ya8gAAAABJRU5ErkJggg=="
               height='40'
               width='40' />
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
    <div className='rating thoughts'>
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
    <div className='user-thoughts-container'>
      <img src="https://img.icons8.com/ios-filled/50/000000/salt-bae.png"
           height='50'
           width='50' />
      <h4> Food For Thoughts! </h4>
   
      <Tried tried={tried} setTried={setTried} />
   
      <Rating setRating={setRating} rating={rating} />
   
      <Comment comment={comment} setComment={setComment} />

    </div>
    );
}