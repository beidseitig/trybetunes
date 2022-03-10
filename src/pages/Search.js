import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { searchInput } = this.state;
    const min = 2;

    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
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
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
