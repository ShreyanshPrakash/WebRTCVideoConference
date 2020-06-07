import React from 'react';

import {
    Container,
    Grid,
} from '@material-ui/core';

import './lobby.style.scss';

function LobbyComponent(){

    return(
        <React.Fragment>
            <Container className="lobbyWrapper">
                <Grid container justify="space around" alignItems="center">
                    <Grid item className="videoFeedWrapper">

                    </Grid>
                    <Grid item className="meetingInfoWrapper">

                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export {
    LobbyComponent,
}