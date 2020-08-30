import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';

class PlayerForm extends React.Component {
  static propTypes = {
    createPlayer: PropTypes.func.isRequired,
    updatePlayer: PropTypes.func.isRequired,
    selectedPlayer: PropTypes.object.isRequired,
    closeForm: PropTypes.func.isRequired,
  }

  state = {
    imageUrl: '',
    name: '',
    position: '',
    isEditing: false,
  }

  componentDidMount() {
    const { selectedPlayer } = this.props;
    if (selectedPlayer.name) {
      this.setState({
        imageUrl: selectedPlayer.imageUrl,
        name: selectedPlayer.name,
        position: selectedPlayer.position,
        isEditing: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const prevPlayer = prevProps.selectedPlayer;
    const incomingPlayer = this.props.selectedPlayer;
    if (prevPlayer.name !== incomingPlayer.name) {
      this.setState({
        imageUrl: incomingPlayer.imageUrl || '',
        name: incomingPlayer.name || '',
        position: incomingPlayer.position || '',
        // eslint-disable-next-line no-unneeded-ternary
        isEditing: incomingPlayer.name ? true : false,
      });
    }
  }

  changeImageUrlEvent = (e) => {
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
    const {
      imageUrl, name, position,
    } = this.state;
    const { createPlayer } = this.props;

    const newPlayer = {
      imageUrl,
      name,
      position,
      uid: authData.getUid(),
    };

    createPlayer(newPlayer);
  }

  editPlayerEvent = (e) => {
    e.preventDefault();
    const {
      imageUrl, name, position,
    } = this.state;
    const { updatePlayer, selectedPlayer } = this.props;

    const myPlayerWithChanges = {
      imageUrl,
      name,
      position,
      uid: authData.getUid(),
    };

    updatePlayer(selectedPlayer.id, myPlayerWithChanges);
  }

  closeFormEvent = (e) => {
    e.preventDefault();
    this.props.closeForm();
  };

  render() {
    return (
      <form className="col-6 offset-3">
        <button className="btn btn-dark" onClick={this.closeFormEvent}><i className="fas fa-window-close"></i></button>
         <div className="form-group">
        <label htmlFor="playerImg">Player Image</label>
        <input
          type="text"
          className="form-control"
          id="playerImg"
          placeholder="Add Player Image"
          onChange={this.changeImageUrlEvent}
        />
      </div>
      <div className="form-group">
        <label htmlFor="playerName">PlayerName</label>
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
      <button className="btn btn-dark" onClick={this.editPlayerEvent}>Edit Player</button>
      <button className="btn btn-dark" onClick={this.savePlayerEvent}>Save Player</button>
    </form>
    );
  }
}

export default PlayerForm;
