import React from 'react';
import {
    Container, Grid, Paper, Button, FormControl, TextField, FormHelperText, FormLabel, Divider,
  } from '@material-ui/core';
  import SendIcon from '@material-ui/icons/Send';
  import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

function FormComponent(){

    return(
        <React.Fragment>
            <Container>
            <Grid container justify="center" spacing={2}>
          <form onSubmit={handleSubmit} autoComplete="off">
            <Grid container className="fieldSet">
            <FormControl
              color="primary"
              component="fieldset"
              className="formControl"
              margin="normal"
            >
              <FormLabel component="legend">
                Do you want to create a private meeting room
              </FormLabel>

              <TextField
                fullWidth
                label="Create meeting"
                margin="dense"
                placeholder="Enter meeting name"
                name="createMeeting"
                // onChange={(event) => handleFieldChange(
                //   event,
                //   'paymentStatus',
                //   event.target.value
                // )}
                variant="outlined"
              />
              <FormHelperText>This is used to generate a private meeting room</FormHelperText>
              <Button
                color="primary"
                fullWidth
                type="submit"
                variant="contained"

              >
                Create a meeting
              </Button>
            </FormControl>
            </Grid>
            {/* <Divider/>
            <Grid container>
            <FormControl
              color="primary"
              component="fieldset"
              className="formControl"
              margin="normal"
            >
              <FormLabel component="legend">
                Do you want to create a private meeting room
              </FormLabel>

              <TextField
                fullWidth
                label="Create meeting"
                margin="dense"
                placeholder="Enter meeting name"
                name="createMeeting"
                // onChange={(event) => handleFieldChange(
                //   event,
                //   'paymentStatus',
                //   event.target.value
                // )}
                variant="outlined"
              />
              <FormHelperText>This is used to generate a private meeting room</FormHelperText>
              <Button
                color="primary"
                fullWidth
                type="submit"
                variant="contained"

              >
                Create a meeting
              </Button>
            </FormControl>
            </Grid> */}
          </form>
        </Grid>
            </Container>
        </React.Fragment>
    )
}

export {
    FormComponent,
}