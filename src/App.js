import React from 'react';
import './App.css';

import {
  Container, Grid, Paper, Button,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

function App() {
  return (
    <React.Fragment>
      <Container maxWidth="xs" className="container">
        <Grid container spacing={2} justify="center">
          <AccountCircleOutlinedIcon/>
        </Grid>
        <Grid container justify="space-evenly" spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" size="small">
                Create Meeting
              </Button>
            </Grid>
            <Grid item>
              <Paper elevation={3} className="paper">
                Create Meeting
              </Paper>
            </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default App;
