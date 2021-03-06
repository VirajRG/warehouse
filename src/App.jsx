import React, {Component} from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import UploaderContainer from './components/uploader/uploader-container';
import PickListContainer from './components/picklist/picklist-container';
import SummaryContainer from './components/summary/summary-container';
import SearchOrderNoContainer from './components/searchOrderNo/search-order-no-container';
import history from './history'

class App extends Component {
  render() {
    return (
      <Router history={history}>
      <div>
        <Route exact path="/" component={UploaderContainer} />
        <Route path="/:pickListNo/:binName" component={PickListContainer} />
        <Route path="/searchOrderNo" component={SearchOrderNoContainer} />
        <Route path="/summary" component={SummaryContainer} />
      </div>
      </Router>
    );
  }
}

export default App;
