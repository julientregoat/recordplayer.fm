import React from 'react';

import { Grid, Button } from 'semantic-ui-react'

const Authenticate = ({ discogsAuth }) => (
  <React.Fragment>
    <Grid.Row><p> Thanks for joining recordplayer.fm. Now that you've created your account, we need to link your Discogs account in orcer to access your collection.</p> </Grid.Row>
    <Grid.Row><Button onClick={discogsAuth}>Link Discogs Account</Button></Grid.Row>
  </React.Fragment>
);

export default Authenticate;
