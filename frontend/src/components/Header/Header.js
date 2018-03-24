import React, { Component } from 'react';

import { Grid } from 'semantic-ui-react'

class Header extends Component {

  render() {
    return (
      <Grid.Row className="header">
        <Grid.Column><h1 className="tracking-in-expand">recordplayer.fm</h1></Grid.Column>
      </Grid.Row>
    );
  }

}

export default Header;
