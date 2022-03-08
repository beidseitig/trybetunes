import React from 'react';
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
      </header>
    );
  }
}

export default Header;
