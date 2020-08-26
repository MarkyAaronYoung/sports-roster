import React from 'react';
// import PropTypes from 'prop-types';

import Player from '../Player/Player';

import authData from '../../helpers/data/authData';

import playersData from '../../helpers/data/playersData';

class Team extends React.Component {
  state = {
    players: [],
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
    const { players } = this.state;

    const playerCard = players.map((player) => <Player key={player.id} player={player} deletePlayer={this.deletePlayer}/>);
    return (
      <div className="card-columns">
        {playerCard}
      </div>
    );
  }
}

export default Team;
