import React, {Component} from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import UploaderContainer from './components/uploader/uploader-container.jsx';
import history from './history'

class App extends Component {
  render() {
    return (
      <Router history={history}>
      <div>
        <Route exact path="/" component={UploaderContainer} />
      </div>
      </Router>
    );
  }
}

export default App;
