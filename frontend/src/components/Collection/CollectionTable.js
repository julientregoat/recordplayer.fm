import React from 'react';

import { Icon, Grid, Table, Button, Pagination } from 'semantic-ui-react'

const Collection = ({ callWorker, tracks, syncing, page, totalPages, changePage }) => (
  <React.Fragment>
    <Grid.Row>
      <Grid.Column width="6" verticalAlign="bottom" onClick={callWorker}>
        <Icon loading={syncing} name="refresh" size="large"/>
        <span>sync with discogs</span>
      </Grid.Column>
      <Grid.Column textAlign="right" width="10">
        <Pagination
          activePage={page + 1}
          pointing
          secondary
          totalPages={totalPages + 1}
          onPageChange={changePage}
        />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Table celled size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Track</Table.HeaderCell>
            <Table.HeaderCell>Artist(s)</Table.HeaderCell>
            <Table.HeaderCell>Release</Table.HeaderCell>
            <Table.HeaderCell>Catalog Number</Table.HeaderCell>
            <Table.HeaderCell>Listen</Table.HeaderCell>
            <Table.HeaderCell>Add To Playlist</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tracks.length !== 0 ? tracks.map(track => (
            <Table.Row key={track.id}>
              <Table.Cell>{track.title}</Table.Cell>
              <Table.Cell>{track.Release.Artists.map(artist => artist.name)}</Table.Cell>
              <Table.Cell>{track.Release.title}</Table.Cell>
              <Table.Cell>{track.Release.catno}</Table.Cell>
              <Table.Cell><Icon name="sound" onClick={() => window.open("http://youtube.com/watch?v=" + track.Video.youtube_id)}/></Table.Cell>
              <Table.Cell><Icon name="add"/></Table.Cell>
            </Table.Row>)
        ) : null}
        </Table.Body>
      </Table>
    </Grid.Row>

  </React.Fragment>
);

export default Collection;
