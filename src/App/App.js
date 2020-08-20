import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import fbConnection from '../helpers/data/connection';

import './App.scss';

fbConnection();

class App extends React.Component {
state = {
  authed: false,
}

componentDidMount() {
  this.removeListener = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({ authed: true });
    } else {
      this.setState({ authed: false});
    }
  })
}
  render() {
    return (
      <div className="App">
        <h2>Sports-Roster</h2>
        <button className="btn btn-info">I am a button</button>
      </div>
    );
  }
}

export default App;
