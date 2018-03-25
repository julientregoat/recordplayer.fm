import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'

import Library from './Library'
import Authenticate from './Authenticate'

class HomePage extends Component {

  render() {
    console.log(this.props.currentUser)
    return (
      <Grid className="home-page">
        <Grid.Row>
          <h2>welcome, {this.props.currentUser.username}</h2>
        </Grid.Row>
        {this.props.currentUser.authenticated ? <Library /> : <Authenticate discogsAuth={this.props.discogsAuth}/>}
      </Grid>
    );
  }

}

export default HomePage;
