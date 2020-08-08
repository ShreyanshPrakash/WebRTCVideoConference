import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import {
  LinearProgress,
} from '@material-ui/core';

import { getEnvVars } from 'src/config/env.config';
import { setEnvVars } from 'src/utils';
import { apiEndpoints } from 'src/config/api.config';
import { 
  setEnvVarsForHttpClient, 
  setEnvEndpoints, 
  createAxiosInstance 
} from 'src/services';


import './App.css';


// Dynamic/Lazy loading
const HomeComponent = React.lazy(
  () => import('src/components')
    .then(module => ({ default: module.HomeComponent }))
)
const LobbyComponent = React.lazy(
  () => import('src/components')
    .then( module => ({default: module.LobbyComponent}))
)

// Setting initial env vars
  setEnvVars(getEnvVars());
  setEnvVarsForHttpClient(getEnvVars());
  setEnvEndpoints(apiEndpoints);
  createAxiosInstance();


function App() {





  return (
    <React.Fragment>
      <Suspense fallback={<LinearProgress />}>
        <Router>
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route path="/lobby" component={LobbyComponent} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </Router>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
