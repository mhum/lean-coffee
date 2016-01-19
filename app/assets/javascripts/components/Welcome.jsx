import React from 'react';
import { Button, ButtonToolbar, Jumbotron } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default React.createClass({
  render: function() {
    return (
      <div className='welcome'>
        <div className='page-header'></div>
        <Jumbotron>
          <h1>Lean Coffee Sessions</h1>
          <p>Welcome to lean coffee sessions! Choose from the options below to
          start a new sessions or view one that has already been created.</p>
          <ButtonToolbar>
            <Button href='/session/new' bsSize='lg' bsStyle='primary' >
              Start Fresh</Button>
            <LinkContainer to='/sessions'>
              <Button bsSize='lg' bsStyle='primary' >
                View Existing</Button>
            </LinkContainer>
          </ButtonToolbar>
        </Jumbotron>
      </div>
    );
  },
});
