import React from 'react';

import { NavLink } from 'react-router-dom';

const NavBar = ({}) => (
  <React.Fragment>
    <NavLink to="/collection" className="navbar-item">collection</NavLink>
    <NavLink to="/playlists" className="navbar-item">playlists</NavLink>
    <NavLink to="/account" className="navbar-item">account</NavLink>
  </React.Fragment>
);

export default NavBar;
