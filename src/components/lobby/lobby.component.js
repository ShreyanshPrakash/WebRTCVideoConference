import React, { useState, useRef, useEffect } from 'react';

import {
    Container,
    Grid,
    Typography,
} from '@material-ui/core';

import {
    useGetUserMedia,
} from 'src/hooks';

import './lobby.style.scss';

function LobbyComponent(){

    const [userStream, setUserStream] = useState("");
    const [participantsStream, setParticipantsStream] = useState("");

    const userRef = useRef('');

    const mediaStream = useGetUserMedia({
        video: true,
        audio: true,
    });

    useEffect( () => {
        if( mediaStream ){
            userRef.current.srcObject = mediaStream;
            userRef.current.play()
        }
    }, [mediaStream])


    return(
        <React.Fragment>
            <Container className="lobbyWrapper">
                <Grid container justify="space-between" alignItems="center">
                    <Grid item className="videoFeedWrapper">
                        <video
                            className="userVideoStream"
                            ref={userRef}
                            muted={true}
                        >
                        </video>
                    </Grid>
                    <Grid item className="meetingInfoWrapper">
                        <Typography>
                            Meeting name
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export {
    LobbyComponent,
}