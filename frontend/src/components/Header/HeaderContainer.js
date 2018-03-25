import React, { Component } from 'react';

import { Grid, Header, Image, Button } from 'semantic-ui-react'

import logo from './turntable.svg'

const HeaderContainer = ({logout}) => (
  <Grid>
    <Grid.Row className="header" verticalAlign="middle">
      <Grid.Column width={8}>
        <Header as="h1" className="text-focus-in">
          <Image src={logo} className="header-logo" alt="logo" />
          recordplayer.fm
        </Header>
      </Grid.Column>
      <Grid.Column width={8} textAlign="right">
        <Button
          className="logout-button"
          size="mini"
          color="blue"
          inverted
          onClick={logout}>logout</Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default HeaderContainer;
