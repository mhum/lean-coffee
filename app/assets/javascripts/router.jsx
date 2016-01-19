import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App';
import Sessions from './components/sessions/Sessions';
import Welcome from './components/Welcome';

import { Provider } from 'react-redux';

import createStore from './create-store';

const store = createStore();

export default React.createClass({
  render() {
    return (
      <Provider store={ store }>
        <Router history={hashHistory}>
          <Route path='/' component={App}>
            <IndexRoute component={Welcome} />
            <Route name='sessions' path='sessions' component={Sessions} />
          </Route>
        </Router>
      </Provider>
    );
  }
});
