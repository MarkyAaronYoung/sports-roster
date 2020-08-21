import React from 'react';
// import PropTypes from 'prop-types';

import playerShape from '../../helpers/propz/playerShape';

import './Player.scss';

class Player extends React.Component {
  static propTypes ={
    player: playerShape.playerShape,
  }

  render() {
    const { player } = this.props;
    return (
    <div className="card playerCard card bg-dark text-light border-0" >
      <img className="card-img-top" src={player.imageUrl} alt="Card cap" />
      <div className="card-img-overlay">
        <p className='team'> Double Goblins</p>
        <div className='info'>
          <h4 className='name'>{player.name}</h4>
          <h5 className='position'>Position: {player.position}</h5>
        </div>
      </div>
    </div>
    );
  }
}

export default Player;
