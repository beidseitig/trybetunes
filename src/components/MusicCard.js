import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
    this.addFavorite = this.addFavorite.bind(this);
  }

  async addFavorite({ target }) {
    const { music } = this.props;
    this.setState({ loading: true });
    if (target.checked) {
      await addSong(music);
    }
    this.setState({ loading: false });
  }

  render() {
    const { music: { trackName, previewUrl, trackId, artworkUrl100 },
    } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <div>
          <img src={ artworkUrl100 } alt={ trackName } />
        </div>
        <div>
          <p>{ trackName }</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </div>
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            name="favorite"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.addFavorite }
          />
        </label>
        {loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
};

export default MusicCard;
