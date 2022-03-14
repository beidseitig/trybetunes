import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checkedSongs: [],
      isChecked: false,
    };
    this.addFavorite = this.addFavorite.bind(this);
    this.favoriteMusic = this.favoriteMusic.bind(this);
  }

  componentDidMount() {
    this.favoriteMusic();
  }

  async addFavorite({ target }) {
    const { music } = this.props;
    this.setState({ loading: true });
    if (target.checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({ loading: false, isChecked: true });
  }

  async favoriteMusic() {
    this.setState({ loading: true });
    const favSongs = await getFavoriteSongs();
    this.setState({ checkedSongs: favSongs, loading: false });
    console.log('Okay');
    const { checkedSongs } = this.state;
    const { music } = this.props;
    const check = checkedSongs.find((e) => (e.trackName.includes(music.trackName)));
    if (check) {
      this.setState({ isChecked: true });
    }
  }

  render() {
    const { music: { trackName, previewUrl, trackId, artworkUrl100 },
    } = this.props;
    const { loading, isChecked } = this.state;
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
            checked={ isChecked }
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
