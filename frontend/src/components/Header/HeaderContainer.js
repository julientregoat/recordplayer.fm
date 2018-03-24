import React, { Component } from 'react';

import { Grid, Header, Image } from 'semantic-ui-react'

import logo from './turntable.svg'

class HeaderContainer extends Component {

  render() {
    return (
      <Grid.Row className="header">
        <Grid.Column>
          <Header as="h1" className="text-focus-in">
            <Image src={logo} className="header-logo" alt="logo" />
            recordplayer.fm
          </Header>
        </Grid.Column>
      </Grid.Row>
    );
  }

}

export default HeaderContainer;
