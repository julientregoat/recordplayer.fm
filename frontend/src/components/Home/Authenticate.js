import React from 'react';

import { Grid, Button } from 'semantic-ui-react'

const Authenticate = ({ discogsAuth, queryUserInfo }) => (
  <React.Fragment>
    <Grid.Row><p className="large-message"> Thanks for joining recordplayer.fm. Now that you've created your account, we need to link your Discogs account in orcer to access your collection.</p> </Grid.Row>
    <Grid.Row><Button inverted color="red" onClick={discogsAuth}>Link Discogs Account</Button></Grid.Row>
    <Grid.Row><p>Once you've authenticated, your collection will begin to sync. As it does, the releases will slowly populate in your account. This page should update in 10 seconds to update your account. If not, you can click the button below to do it manually.</p></Grid.Row>
    <Grid.Row><Button basic color="black" onClick={queryUserInfo}>I authenticated!</Button></Grid.Row>
  </React.Fragment>
);

export default Authenticate;
