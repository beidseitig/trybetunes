import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
          <Login />
          <Search />
          <Album />
          <Favorites />
          <Profile />
          <ProfileEdit />
          <NotFound />
          
          {/* <Route exact path ="/" Component={ Login } />
          <Route exact path ="/search" Component={ Search } />
          <Route exact path ="/album/:id" Component={ Album } />
          <Route exact path ="/favorites" Component={ Favorites } />
          <Route exact path ="/profile" Component={ Profile } />
          <Route exact path ="/profile/edit" Component={ ProfileEdit } />
          <Route exact path ="*" Component={ NotFound } /> */}
      </BrowserRouter>
    );
  }
}

export default App;
