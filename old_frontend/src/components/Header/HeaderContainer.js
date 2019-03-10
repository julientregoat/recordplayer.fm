import React, { Component } from 'react';

import { Grid, Header, Image, Button } from 'semantic-ui-react'

import NavBar from './NavBar';

import logo from './turntable.svg'

const HeaderContainer = ({currentUser, logout}) => (
  <Grid>
    <Grid.Row centered className="header text-focus-in" verticalAlign="middle">
      <Grid.Column width={6} className="header-logo-container">
        <Header as="h1">
          <Image src={logo} className="header-logo" alt="logo" />
          recordplayer.fm
        </Header>
      </Grid.Column>

      <Grid.Column width={6}>
        <NavBar />
      </Grid.Column>

      <Grid.Column width={2}>
        {currentUser ? "hello, " + currentUser.username : "let's jam!"}
      </Grid.Column>

      <Grid.Column width={2} textAlign="right">
        {currentUser ?
          <Button
          size="mini"
          color="black"
          className=""
          basic
          onClick={logout}>logout</Button> :
          <Button
            size="mini"
            color="black"
            basic> login </Button>}
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default HeaderContainer;
