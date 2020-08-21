import React from 'react';
// import PropTypes from 'prop-types';

import Player from '../Player/Player';

import authData from '../../helpers/data/authData';

import playersData from '../../helpers/data/playersData';

class Team extends React.Component {
  state = {
    players: [],
  }

  componentDidMount() {
    playersData.getPlayersByUid(authData.getUid())
      .then((players) => this.setState({ players }))
      .catch((err) => console.error('get players broke', err));
  }

  render() {
    const { players } = this.state;

    const playerCard = players.map((player) => <Player key={player.id} player={player}/>);
    return (
      <div className="card-columns">
        {playerCard}
      </div>
    );
  }
}

export default Team;
