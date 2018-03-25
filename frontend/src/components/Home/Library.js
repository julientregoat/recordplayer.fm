import React from 'react';

import { Button } from 'semantic-ui-react'

const Library = ({callWorker}) => (
  <div>
    <p>Music stuff here, this the library</p>
    <Button onClick={callWorker} basic color="yellow">SYNC</Button>
  </div>
);

export default Library;
