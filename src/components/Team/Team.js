import React from 'react';
// import PropTypes from 'prop-types';

import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';

import authData from '../../helpers/data/authData';
import playersData from '../../helpers/data/playersData';

class Team extends React.Component {
  state = {
    players: [],
    formOpen: false,
    updatePlayer: {},
  }

  createPlayer = (newPlayer) => {
    playersData.createPlayer(newPlayer)
      .then(() => {
        this.getPlayers();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('create player broke', err));
  }

  deletePlayer = (playerId) => {
    playersData.deletePlayer(playerId)
      .then(() => this.getPlayers())
      .catch((err) => console.error('cannot fire player', err));
  }

  getPlayers = () => {
    playersData.getPlayersByUid(authData.getUid())
      .then((players) => this.setState({ players }))
      .catch((err) => console.error('get players broke', err));
  }

  selectEditPlayer = (player) => {
    console.error(player);
    this.setState({ editPlayer: player, formOpen: true });
  }

  editPlayer = (playerId, playerObj) => {
    playersData.updatePlayer(playerId, playerObj)
      .then(() => {
        this.getPlayers();
        this.state({ updatePlayer: {}, formOpen: false });
      })
      .catch((err) => console.error('failed to edit', err));
  }

  componentDidMount() {
    this.getPlayers();
  }

  render() {
    const { players, formOpen, updatePlayer } = this.state;

    const playerCard = players.map((player) => <Player key={player.id} player={player} selectEditPlayer={this.selectEditPlayer} deletePlayer={this.deletePlayer}/>);
    return (
      <div className="Roster">
        <button className="btn btn-warning" onClick={() => { this.setState({ formOpen: !formOpen, editPlayer: {} }); }}><i className="far fa-plus-square"></i>Create Player</button>
        { formOpen ? <PlayerForm updatePlayer={updatePlayer} editPlayer={this.editPlayer} createPlayer={this.createPlayer} closeForm={this.closeForm}/> : ''}
        <div className="card-columns">
          {playerCard}
        </div>
      </div>
    );
  }
}

export default Team;
