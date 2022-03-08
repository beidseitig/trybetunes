import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userInput: '',
      loading: false,
    };
    this.userChange = this.userChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async userChange() {
    const { userInput } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name: userInput });
    history.push('/search');
  }

  render() {
    const { userInput, loading } = this.state;
    const min = 3;

    return (
      <div data-testid="page-login">
        <input
          type="text"
          data-testid="login-name-input"
          placeholder="Name..."
          name="userInput"
          value={ userInput }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          name="loginButton"
          disabled={ userInput.length < min }
          onClick={ this.userChange }
        >
          Entrar
        </button>
        { loading && <Loading /> }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
