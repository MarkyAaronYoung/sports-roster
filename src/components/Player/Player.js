import React from 'react';
// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';

import playerShape from '../../helpers/propz/playerShape';

import './Player.scss';

class Player extends React.Component {
  static propTypes ={
    player: playerShape.playerShape,
    deletePlayer: PropTypes.func.isRequired,
  }

deletePlayerEvent = (e) => {
  e.preventDefault();
  const { player, deletePlayer } = this.props;

  deletePlayer(player.id);
};

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
          <div className="btn-group">
            <button className="btn btn-warning" onClick={this.deletePlayerEvent}>Fire</button>
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default Player;
