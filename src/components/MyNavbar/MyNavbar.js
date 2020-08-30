import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import Auth from '../Auth/Auth';
import 'firebase/auth';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  logoutClickEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;

    return (
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">Navbar</span>
        {
          authed ? (
            <button className="btn btn-secondary" onClick={this.logoutClickEvent}>Log Out</button>
          ) : (
            <Auth />
          )
        }
      </nav>
    );
  }
}

export default MyNavbar;
