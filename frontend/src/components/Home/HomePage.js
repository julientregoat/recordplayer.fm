import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'

import Collection from './Collection'
import Authenticate from './Authenticate'

class HomePage extends Component {

  state = {
    tracks: []
  }

  callWorker = () => {
    fetch('http://localhost:3001/discogs/worker', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.props.currentUser)
    })
    .then(res => res.json()).then(console.log)
  }

  fetchCollection = () => {
    if (this.props.currentUser.authenticated){
      fetch(`http://localhost:3001/api/users/${this.props.currentUser.id}/collection`)
      .then(res => res.json())
      .then(result => {
        this.setState({tracks: result.tracks})})
    }
  }

  componentDidMount(){
    this.fetchCollection()
  }

  render() {
    return (
      <Grid className="home-page">
        <Grid.Row>
          <h2>welcome, {this.props.currentUser.username}</h2>
        </Grid.Row>
        {this.props.currentUser.authenticated ?
          <Collection
            callWorker={this.callWorker}
            tracks={this.state.tracks}/> :
          <Authenticate
            discogsAuth={this.props.discogsAuth}
            queryUserInfo={this.props.queryUserInfo}/>}
      </Grid>
    );
  }

}

export default HomePage;
