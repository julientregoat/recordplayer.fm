import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'

import Collection from './Collection'
import Authenticate from './Authenticate'

class HomePage extends Component {

  state = {
    tracks: [],
    page: 0,
    totalPages: 1,
    loading: true,
    syncing: false
  }

  callWorker = () => {
    this.setState({syncing: true})
    fetch('http://localhost:3001/discogs/worker', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.props.currentUser)
    })
    .then(this.setState({syncing: false}))
  }

  fetchCollection = () => {
    if (this.props.currentUser.authenticated){
      this.state.loading ? null : this.setState({loading: true})
      fetch(`http://localhost:3001/api/users/${this.props.currentUser.id}/collection?size=100&page=${this.state.page}`)
      .then(res => res.json())
      .then(result => {
        console.log(result)
        this.setState({totalPages: result.totalPages, tracks: result.tracks, loading: false})})
    }
  }

  componentDidMount(){
    this.fetchCollection()
  }

  componentDidUpdate(){
    // should use componentDidUpdate to check release count and see if I need to update that
    if (this.state.tracks && this.state.loading){
      this.setState({loading: false})
    }

  }

  changePage = (event, data) => {
    // copmensating for index offset re: pages
    let newPage = data.activePage - 1
    console.log(newPage)
    this.setState({page: newPage}, () => this.fetchCollection())
  }

  render() {
    return (
      <Grid className="home-page">
        <Grid.Row>
          <h2>welcome, {this.props.currentUser.username}</h2>
        </Grid.Row>
        {this.props.currentUser.authenticated ?
          (this.state.loading ? <Loader active size="massive"/> : <Collection
            callWorker={this.callWorker}
            tracks={this.state.tracks}
            syncing={this.state.syncing}
            page={this.state.page}
            totalPages={this.state.totalPages}
            changePage={this.changePage}/>) :
          <Authenticate
            discogsAuth={this.props.discogsAuth}
            queryUserInfo={this.props.queryUserInfo}/>}
      </Grid>
    );
  }

}

export default HomePage;
