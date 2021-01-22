import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { PostList, PostCreate } from './Posts';

const App = () => (
  <Admin dataProvider={jsonServerProvider('http://jsonplaceholder.typicode.com')} disableTelemetry>
    <Resource
      name="posts"
      create={PostCreate}
      list={PostList} />
  </Admin>
);

export default App;
