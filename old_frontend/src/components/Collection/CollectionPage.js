import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'

import CollectionTable from './CollectionTable'
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
        // subtracting one page to account for the 0 index
        this.setState({totalPages: result.totalPages - 1, tracks: result.tracks, loading: false})})
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
      <Grid className="collection-page">
        {this.state.loading ? <Loader active size="massive" className="collection-loader"/> : null}
        {this.props.currentUser.authenticated ?
          <CollectionTable
            callWorker={this.callWorker}
            tracks={this.state.tracks}
            syncing={this.state.syncing}
            page={this.state.page}
            totalPages={this.state.totalPages}
            changePage={this.changePage}
          /> :
          <Authenticate
            authenticateDiscogs={this.props.authenticateDiscogs}
          />}
      </Grid>
    );
  }

}

export default HomePage;
