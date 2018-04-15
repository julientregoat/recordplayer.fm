import React, { Component } from 'react';
import NewPlaylistForm from './NewPlaylistForm'
import UserPlaylists from './UserPlaylists'

class PlaylistsPage extends Component {

  state = {
    playlists: []
  }

  componentDidMount(){
    this.fetchPlaylists()
  }

  fetchPlaylists = () => {
    fetch(`http://localhost:3001/api/users/${this.props.currentUser.id}/playlists`)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log('Error:', err))
  }

  newPlaylist = e => {
    e.preventDefault()
    let name = e.target.newPlaylistName.value
    // fetch('http://localhost:3001/api/playlists', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({name: "poop"})
    // })
  }

  render() {
    return (
      <div>
        <NewPlaylistForm handleSubmit={this.newPlaylist} />
        <UserPlaylists playlists={this.state.playlists}/>
      </div>
    );
  }

}

export default PlaylistsPage;
