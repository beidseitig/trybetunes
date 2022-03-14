import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      name: '',
      album: '',
    };
  }

  componentDidMount() {
    this.albumContent();
  }

  albumContent = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const response = await getMusics(id);
    console.log(response);
    this.setState({
      musics: response.slice(1),
      name: response[0].artistName,
      album: response[0].collectionName,
    });
  }

  render() {
    const { musics, album, name } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {musics ? (
          <div>
            <p data-testid="artist-name">{ name }</p>
            <p data-testid="album-name">{ album }</p>
          </div>
        ) : (
          <Loading />
        )}
        {musics.map((element) => (
          <MusicCard key={ element.trackId } music={ element } />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default Album;
