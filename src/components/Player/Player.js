import React from 'react';
import PropTypes from 'prop-types';
import playerShape from '../../helpers/propz/playerShape';

class Player extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
    deletePlayer: PropTypes.func.isRequired,
    editAPlayer: PropTypes.func.isRequired,
  }

  deletePlayerEvent = (e) => {
    e.preventDefault();
    const { player, deletePlayer } = this.props;

    deletePlayer(player.id);
  };

  editPlayerEvent = (e) => {
    e.preventDefault();
    const { editAPlayer, player } = this.props;
    editAPlayer(player);
  }

  render() {
    const { player } = this.props;
    return (
      <div className="card player-card text-white bg-dark mb-3 rounded">
        <img src={ player.imageUrl } className="card-img-top rounded-circle" alt="playerPort"></img>
        <div className="card-body">
          <h3 className="card-title">{ player.name }</h3>
          <h4 className="card-text">{ player.position }</h4>
          <button type="button" className="btn btn-secondary"
          onClick={this.deletePlayerEvent}>Fire</button> <button className="btn btn-light" onClick={this.editPlayerEvent}><i className="far fa-edit">Edit</i></button>
        </div>
      </div>
    );
  }
}

export default Player;
