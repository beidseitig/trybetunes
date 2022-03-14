import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      albuns: null,
      loading: false,
      artist: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  searchAlbum = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { searchInput } = this.state;
    const response = await searchAlbumsAPI(searchInput);
    console.log(response);
    this.setState({
      artist: searchInput,
      albuns: response,
      loading: false,
      searchInput: '',
    });
  }

  searchResult = (albuns) => {
    if (albuns.length > 0) {
      return albuns.map((e) => (
        <Link
          to={ `/album/${e.collectionId}` }
          name={ e.artistName }
          key={ e.collectionID }
          data-testid={ `link-to-album-${e.collectionId}` }
        >
          <div key="e.collectionId">
            <h1>{e.artistName}</h1>
            <h3>{e.collectionName}</h3>
            <img src={ e.artworkUrl100 } alt={ e.collectionName } />
          </div>
        </Link>
      ));
    }
    return <p>Nenhum álbum foi encontrado</p>;
  }

  render() {
    const { searchInput, loading, albuns, artist } = this.state;
    const min = 2;

    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Search..."
            name="searchInput"
            value={ searchInput }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            name="searchButton"
            disabled={ searchInput.length < min }
            onClick={ this.searchAlbum }
          >
            Pesquisar
          </button>
        </div>
        <div>
          { loading ? <Loading /> : <p>{ `Resultado de álbuns de: ${artist}` }</p>}
          { albuns ? this.searchResult(albuns) : '' }
        </div>
        {/* <div>
          {albuns.map((e) => (
            <Link
              to={`/album/${e.collectionId}`}
              name={ e.artistName }
              key={ e.collectionID }
              data-testid={`link-to-album-${ e.collectionId}` }
            >
              <div key="e.collectionId">
                <h1>{e.artistName}</h1>
                <h3>{e.collectionName}</h3>
                <img src={ e.artworkUrl100 } alt={ e.collectionName } />
              </div>
            </Link>
          ))}
        </div> */}
      </div>
    );
  }
}

export default Search;
