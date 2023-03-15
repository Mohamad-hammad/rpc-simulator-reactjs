import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
function Landing() {
  const [numObjects, setNumObjects] = useState('');
  const navigate = useNavigate();
  const handleNumObjectsChange = (event) => {
    setNumObjects(event.target.value);
  };

  const handlePlayClick = () => {
    // TODO: implement game logic
    console.log('in lanindg : '+numObjects)
    // navigate(`/rpc?totalObject=${numObjects}`);
    navigate("/rpc", {
        state: {
            totalObject: numObjects
        },
    });


  };

  return (
    <div className='Container'>
        <div >
            <Container className="text-center my-5">
                <h1 className="mb-4">Rock Paper Scissors!</h1>
                <Form>
                    <FormGroup>
                    <Label for="numObjects">Enter Number of Objects</Label>
                    <Input
                        type="number"
                        name="numObjects"
                        id="numObjects"
                        value={numObjects}
                        onChange={handleNumObjectsChange}
                    />
                    </FormGroup>
                    <Button color="primary" onClick={handlePlayClick}>Play!</Button>
                </Form>
            </Container>
        </div>
    </div>
   
    
    
  );
}

export default Landing;
