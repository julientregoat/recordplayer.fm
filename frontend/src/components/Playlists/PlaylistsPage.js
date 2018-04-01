import React, { Component } from 'react';

class PlaylistsPage extends Component {

  fetchPlaylists = () => {
    fetch(`http://localhost:3001/users/${this.props.currentUser}/playlists`)
    .then(console.log)
  }

  render() {
    return (
      <div>Your playlists here</div>
    );
  }

}

export default PlaylistsPage;
