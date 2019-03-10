import React from 'react';

import { Grid, Input } from 'semantic-ui-react'

const NewPlaylistForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
    	<Input 
    		name="newPlaylistName"
    		focus 
    		placeholder="New playlist name..." 
    		action={{color: 'black', labelPosition: 'left', icon: 'add', content: 'Create Playlist'}}
    		size="large"
		/>
    </form>
  )
}

	export default NewPlaylistForm;