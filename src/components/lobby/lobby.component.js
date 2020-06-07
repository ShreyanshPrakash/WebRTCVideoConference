import React, { useState, useRef, useEffect } from 'react';

import {
    Container,
    Grid,
    Typography,
    Button,
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import {
    useGetUserMedia,
} from 'src/hooks';
import{
    VideoPlaceholderComponent,
} from 'src/reuseableComp';

import './lobby.style.scss';

function LobbyComponent(){

    const [userStream, setUserStream] = useState("");
    const [participantsStream, setParticipantsStream] = useState("");

    const userVideoRef = useRef('');

    const mediaStream = useGetUserMedia({
        video: true,
        audio: true,
    });

    useEffect( () => {
        if( mediaStream ){
            userVideoRef.current.srcObject = mediaStream;
            userVideoRef.current.play()
        }
    }, [mediaStream])


    return(
        <React.Fragment>
            <Container className="lobbyWrapper">
                <Grid container justify="space-around" alignItems="center">
                    <Grid item className="videoFeedWrapper">
                        <VideoPlaceholderComponent 
                            ref={userVideoRef}
                            config={{
                                muted: true,
                            }}
                        />
                    </Grid>
                    <Grid item className="meetingInfoWrapper">
                        <Typography>
                            Meeting name
                        </Typography>
                        <Button
                            fullWidth
                            color="primary"
                            variant="contained"
                        >
                            Go to Meeting
                            <ArrowForwardIcon />
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export {
    LobbyComponent,
}