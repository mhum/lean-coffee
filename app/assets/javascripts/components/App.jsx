import React from 'react';
import Header from './layout/Header';

export default React.createClass({
  render() {
    return (
      <div>
        <Header/>
          <div className='container content-container'>
            {this.props.children}
          </div>
      </div>
    );
  }
});
