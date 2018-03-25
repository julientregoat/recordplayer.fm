import React from 'react';

import { Button, Grid, Table } from 'semantic-ui-react'

const Collection = ({ callWorker, tracks}) => (
  <React.Fragment>
    <Grid.Row>
      <Button onClick={callWorker} inverted color="blue">SYNC</Button>
    </Grid.Row>

    <Grid.Row>
      <Table celled>
        <Table.Body>
          {tracks.length !== 0 ? tracks.map(track => (
            <Table.Row key={track.id}>
              <Table.Cell>{track.title}</Table.Cell>
              <Table.Cell>{track.Release.title}</Table.Cell>
              <Table.Cell>{track.Release.catno}</Table.Cell>
              <Table.Cell><Button as="a" href={"http://www.youtube.com/watch?v=" + track.Video.youtube_id}>Listen</Button></Table.Cell>
              <Table.Cell><Button as="a" href="http://www.youtube.com">Add To Playlist</Button></Table.Cell>
            </Table.Row>)
        ) : null}
        </Table.Body>
      </Table>
    </Grid.Row>

  </React.Fragment>
);

export default Collection;
