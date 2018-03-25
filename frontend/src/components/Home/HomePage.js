import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'

import Library from './Library'
import Authenticate from './Authenticate'

class HomePage extends Component {

  callWorker = () => {
    fetch('http://localhost:3001/discogs/worker', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.props.currentUser)
    })
    .then(res => res.json()).then(console.log)
  }

  render() {
    return (
      <Grid className="home-page">
        <Grid.Row>
          <h2>welcome, {this.props.currentUser.username}</h2>
        </Grid.Row>
        {this.props.currentUser.authenticated ?
          <Library callWorker={this.callWorker}/> :
          <Authenticate
            discogsAuth={this.props.discogsAuth} queryUserInfo={this.props.queryUserInfo}/>}
      </Grid>
    );
  }

}

export default HomePage;
