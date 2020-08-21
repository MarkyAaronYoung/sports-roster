import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import fbConnection from '../helpers/data/connection';

import Team from '../components/Team/Team';
import MyNavbar from '../components/MyNavbar/MyNavbar';

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
      this.setState({ authed: false });
    }
  });
}

componentWillUnmount() {
  this.removeListener();
}

render() {
  const { authed } = this.state;

  const loadTeam = () => {
    if (authed) {
      return <Team />;
    }
    return <h1>Log in NOW</h1>;
  };

  return (
      <div className="App">
        <h2>Sports-Roster</h2>
        <MyNavbar authed={authed}/>
        {loadTeam()}
      </div>
  );
}
}

export default App;
