import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import TextForm from './text-form';
import Lotus from './lotus';

class App extends React.Component {
  render () {
    return (
      <div className="App">
        <div className="App-panel">
          <Router>
            <Switch>
              <Route path="/lotus">
                <Lotus />
              </Route>
              <Route path="/">
                <TextForm />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
