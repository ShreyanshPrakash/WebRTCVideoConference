import React from 'react';
import './App.css';

// import {

// } from "src/"

function App() {

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <Container maxWidth="xs" className="container">
        <Grid container spacing={2} justify="center" className="logo">
          <AccountCircleOutlinedIcon />
        </Grid>
        
      </Container>
    </React.Fragment>
  );
}

export default App;
