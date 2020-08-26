import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';

class PlayerForm extends React.Component {
  static propTypes= {
    createPlayer: PropTypes.func.isRequired,
  }

  state = {
    imageUrl: '',
    name: '',
    position: '',
  }

  changeImageEvent = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  changePositionEvent = (e) => {
    e.preventDefault();
    this.setState({ position: e.target.value });
  }

  savePlayerEvent = (e) => {
    e.preventDefault();
    const { imageUrl, name, position } = this.state;
    const { createPlayer } = this.props;

    const newPlayer = {
      imageUrl,
      name,
      position,
      uid: authData.getUid(),
    };

    createPlayer(newPlayer);
  }

  render() {
    return (
    <form className="col-6 offset-3">
      <div className="form-group">
     <label htmlFor="playerImg">Player Image</label>
     <input
        type="text"
        className="form-control"
        id="playerImg"
        placeholder="Add Player Image"
        onChange={this.changeImageEvent}
      />
      </div>
      <div className="form">
        <label htmlFor="playerName"> Player Name</label>
        <input
          type="text"
          className="form-control"
          id="playerName"
          placeholder="Enter Player Name"
          onChange={this.changeNameEvent}
          />
      </div>
      <div className="form-group">
        <label htmlFor="playerPosition">Player Position</label>
        <input
          type="text"
          className="form-control"
          id="playerPosition"
          placeholder="Enter Player Position"
          onChange={this.changePositionEvent}
        />
      </div>
      <button className="btn btn-dark" onClick={this.savePlayerEvent}>Save Player</button>
    </form>
    );
  }
}

export default PlayerForm;
