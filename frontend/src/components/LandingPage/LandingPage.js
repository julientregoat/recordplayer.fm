import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class LandingPage extends Component {

  render() {
    return (
      <Grid className="page">
        <Grid.Row centered>
          <h1> welcome to recordplayer.fm</h1>
        </Grid.Row>

        <Grid.Row>
          <p> <b>recordplayer.fm</b> was designed for the record collector utilizing <a href="http://www.discogs.com">Discogs</a> to manage their collection. one of those collectors myself, I found myself listening to music less and less as I collected more records. while the tangibility of records is what makes them so much fun to collect, there aren't many practical options as far as listening to them on the go. the only real option is to rip all of your records, but that implies a lot of things. not everyone has a beautiful listening station with the necessary equipment to proprly rip a record. we don't need to sacrifice the rich history that comes with records and the countless stories to be told about each version in order to bring music with us into the modern age. we do need to encourage the continued archival and sharing of this music, much like storytellers throughout history, in order to be able to pass it on. how do we do this? tl;dr: the internet (duh!).</p>

          <p>so, what does recordplayer.fm <i>do?</i> as the name hints at, this is a streaming 'record player' that you can use anywhere. after creating an account, you connect it to your Discogs account via their OAuth system. once the account is linked, the real fun begins. your collection is taken and releases are split into individual tracks. you can browse your record collection like a digital library of music, listening to tracks and creating playlists out of them.</p>

          <p>currently, the tracks are being played through uploaded youtube videos that are linked to the release on Discogs. as the laundry list of things to do for the website gets done, the plan is to incorporate other source of audio other than youtube. fair warning: there are also going to be errors. sometimes, the videos will not match the song you're trying to listen to, or they won't have a link at all. that's okay for now! we'll find a way to let you let us know, and help us find a better source. and if there is no better source, then this is your call to arms. even if you don't have the best recording setup, if you can get a rip of that B2 that no one knows about, then the online music community will be that much better for it. </p>
        </Grid.Row>

        <Grid.Row centered>
          <Link to="/access"><h2>come inside</h2></Link>
        </Grid.Row>
      </Grid>
    );
  }

}

export default LandingPage;
