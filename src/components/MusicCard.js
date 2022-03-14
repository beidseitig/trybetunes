import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music: { trackName, previewUrl, artworkUrl100 },
    } = this.props;
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
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
};

export default MusicCard;
