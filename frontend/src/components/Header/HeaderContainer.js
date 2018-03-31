import React, { Component } from 'react';

import { Grid, Header, Image, Button } from 'semantic-ui-react'

import NavBar from './NavBar';

import logo from './turntable.svg'

const HeaderContainer = ({currentUser, logout}) => (
  <Grid>
    <Grid.Row className="header" verticalAlign="middle">
      <Grid.Column width={6}>
        <Header as="h1" className="text-focus-in">
          <Image src={logo} className="header-logo" alt="logo" />
          recordplayer.fm
        </Header>
      </Grid.Column>

      <Grid.Column width={6}>
        <NavBar />
      </Grid.Column>

      <Grid.Column width={4} textAlign="right">
        {currentUser ?
          <Button
          className="logout-button"
          size="mini"
          color="blue"
          inverted
          onClick={logout}>logout</Button> :
          <Button
            className="logout-button"
            size="mini"
            color="blue"
            inverted> login </Button>}
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default HeaderContainer;
