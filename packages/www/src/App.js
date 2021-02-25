import './App.css';
import React from 'react';
import TextForm from './text-form'

class App extends React.Component {
  render () {
    return (
      <div className="App">
        <div className="App-panel">
          <TextForm />
        </div>
      </div>
    );
  }
}

export default App;
