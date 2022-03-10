import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userName: '',
    };
    this.currentUser = this.currentUser.bind(this);
  }

  componentDidMount() {
    this.currentUser();
  }

  async currentUser() {
    this.setState({ loading: true });
    const response = await getUser();
    this.setState({
      userName: response.name,
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? (
          <Loading />
        ) : (
          <p data-testid="header-user-name">{userName}</p>
        )}
        <p>
          <Link to="/search" data-testid="link-to-search">Search</Link>
        </p>
        <p>
          <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
        </p>
        <p>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </p>
      </header>
    );
  }
}

export default Header;
