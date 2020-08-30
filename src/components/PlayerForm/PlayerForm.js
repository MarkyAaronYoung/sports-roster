import React from 'react';

import PropTypes from 'prop-types';

// import PlayerData from '../../helpers/data/playersData';

import authData from '../../helpers/data/authData';

class PlayerForm extends React.Component {
  static propTypes= {
    createPlayer: PropTypes.func.isRequired,
    closeForm: PropTypes.func.isRequired,
    selectEditPlayer: PropTypes.object.isRequired,
    updatePlayer: PropTypes.func.isRequired,
  }

  state = {
    isEditing: false,
    imageUrl: '',
    name: '',
    position: '',
  }

  componentDidMount() {
    const { selectEditPlayer } = this.props;
    if (selectEditPlayer.name) {
      this.setState({
        name: selectEditPlayer.name,
        imageUrl: selectEditPlayer.imageUrl,
        position: selectEditPlayer.position,
        isEditing: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const previoiusPlayer = prevProps.selectEditPlayer;
    const incomingPlayer = this.props.selectEditPlayer;

    if (previoiusPlayer.name !== incomingPlayer.name) {
      this.setState({
        name: incomingPlayer.name || '',
        imageUrl: incomingPlayer.imageUrl || '',
        position: incomingPlayer.position || '',
        isEditing: !!incomingPlayer.name,
      });
    }
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
    this.props.closeForm();
  }

  closeFormEvent = (e) => {
    e.preventDefault();
    this.props.closeForm();
  }

  editPlayerEvent = (e) => {
    e.preventDefault();
    const { name, position, imageUrl } = this.state;
    const { updatePlayer, selectEditPlayer } = this.props;

    const editedPlayer = {
      name,
      position,
      imageUrl,
      uid: authData.getUid(),
    };
    updatePlayer(selectEditPlayer.id, editedPlayer);
  }

  render() {
    const {
      isEditing,
      name,
      position,
      imageUrl,
    } = this.state;

    return (
    <form className="col-6 offset-3">
      <button className="formBtn btn btn-warning" onClick={this.closeFormEvent}>Close Form</button>
      <div className="form-group">
     <label htmlFor="playerImg">Player Image</label>
     <input
        type="text"
        className="form-control"
        id="playerImg"
        placeholder="Add Player Image"
        value={imageUrl}
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
          value={name}
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
          value={position}
          onChange={this.changePositionEvent}
        />
      </div>
      {
        isEditing
          ? <button className="btn btn-dark mb-2" onClick={this.editPlayerEvent}>Edit Player</button>
          : <button className="btn btn-dark" onClick={this.savePlayerEvent}>Save Player</button>
      }
    </form>
    );
  }
}

export default PlayerForm;
