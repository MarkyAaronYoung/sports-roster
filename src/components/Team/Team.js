import React from 'react';
// import PropTypes from 'prop-types';

import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';

import authData from '../../helpers/data/authData';
import playersData from '../../helpers/data/playersData';

class Team extends React.Component {
  state = {
    players: [],
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

  componentDidMount() {
    this.getPlayers();
  }

  render() {
    const { players, formOpen } = this.state;

    const playerCard = players.map((player) => <Player key={player.id} player={player} deletePlayer={this.deletePlayer}/>);
    return (
      <div className="Roster">
        <button className="btn btn-warning" onClick={() => { this.setState({ formOpen: !formOpen }); }}><i className="far fa-plus-square"></i>Create Player</button>
        { formOpen ? <PlayerForm createPlayer={this.createPlayer}/> : ''}
        <div className="card-columns">
          {playerCard}
        </div>
      </div>
    );
  }
}

export default Team;
