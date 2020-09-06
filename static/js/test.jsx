// ***** Test Component *****

function TestPage() {
  // test component for javascript and react
  const [test, setTest] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [alert, showAlert] = React.useState(false);

  const handleShow = () => {setShow(true)};
  const handleClose = () => {setShow(false)};

  const testModal = () => {
    console.log('handled Saved Changes modal button');
  };

  React.useEffect(() =>{
    test ? console.log('in useEffect, test is true') : console.log('in useEffect, test is false')
    // setTest(true)
    console.log('in useEffect')
  }, [test]);

  const test3 = () => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      console.log('confirmation alert yes');
      // document.getElementById('test-delete').remove()
      document.getElementById('test-delete').innerHTML = 'new text'
    }
  };

  const [checked, setChecked] = React.useState(false);
  const handleCheck = (e) => {
    // used stopPropagation instead of preventDefault to allow button to be checked on one click
    e.stopPropagation();
    // setChecked(e.target.checked);
    document.getElementById('test-checkbox').checked = true;
  };
  console.log(checked ? 'yes checked' : 'no check');

  const [filled, setFilled] = React.useState(false);
  const [selected, setSelected] = React.useState(false);

  const handleMouseEnter = () => {
    setFilled(true)
  };

  const handleMouseLeave = () => {
    setFilled(false)
  };

  const handleStarClick = (e) => {
    if (selected) {
      setSelected(false)
    } else {
      e.target.setAttribute('checked', 'true');
      setSelected(true)
    };
  };

  const handleAlert = () => {
    showAlert(true)
  };


  return (
    <div>
      <Alert variant='info' show={alert} onClose={() => {showAlert(false)}} dismissible>
        this is test react alert component
      </Alert>

      <Button id='test-alert-btn' variant='info' onClick={handleAlert}>
        click me to alert
      </Button>

      <div id='test-div'> <i className="fas fa-user"></i> </div>
      Test react div <i className="fas fa-star"></i>

      <Button id='test-modal-btn' variant='primary' onClick={handleShow}>
        Launch test modal
      </Button>

      <Modal id='test-modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
          text in modal header? 
        </Modal.Header>

        <Modal.Body>
          modal body
        </Modal.Body>

        <Modal.Footer>
          text in footer
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>

          <Button variant='primary' onClick={() => {handleClose(); testModal(); handleAlert()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <br />

      <button id='test-mouse-over-btn' 
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleStarClick}>
        {selected ? 'filled star' 
          : filled ? 'filled star' 
          : 'unfilled star'}
        <i className="fas fa-star"></i>
      </button>

      <button type='radio' onClick={handleStarClick}>
        checked
      </button>

      <br />

      <h3> Currently missing ingredients </h3>
      <br />

      <Form>
        <Form.Group controlId='testForm.ControlCheckbox'>
          <Form.Label>Test check box </Form.Label>
          <InputGroup.Checkbox id='test-checkbox'
                 type='checkbox'
                 checked={false}
                 onChange={handleCheck} />

        </Form.Group>
      </Form>
    </div>
  );
}