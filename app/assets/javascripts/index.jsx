import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App.jsx';
import Welcome from './components/Welcome.jsx';

render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Welcome} />
    </Route>
  </Router>
), document.getElementById('content'));
