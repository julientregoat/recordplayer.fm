import React from 'react';

import { Button } from 'semantic-ui-react'

const Library = ({ callWorker, releases}) => (
  <div>
    <Button onClick={callWorker} inverted color="blue">SYNC</Button>
  </div>
);

export default Library;
