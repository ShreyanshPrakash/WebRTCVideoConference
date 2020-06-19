import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


import io from 'socket.io-client';
import {
    Container,
    Grid,
    Typography,
    Button,
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


import {
    getQueryParams,
} from 'src/utils';
import {
    useGetUserMedia,
} from 'src/hooks';
import {
    VideoPlaceholderComponent,
} from 'src/reuseableComponents';
import { MeetingInfoModel } from 'src/models';


import './lobby.style.scss';

function LobbyComponent() {

    const [userStream, setUserStream] = useState("");
    const [participantsStream, setParticipantsStream] = useState("");
    const [meetingInfo, setMeetingInfo] = useState(new MeetingInfoModel());
    const [socketConnection, setSocketConnection] = useState({});

    const location = useLocation();

    const userVideoRef = useRef('');

    const mediaStream = useGetUserMedia({
        video: true,
        audio: true,
    }, true);


    useEffect(() => {
        let query = getQueryParams(location.search)
        setMeetingInfo(query);
        if (query.type === "create") {
            createMeeting(query);
        } else {
            joinMeeting({},query);
        }
    }, [])

    useEffect(() => {
        if (mediaStream) {
            userVideoRef.current.srcObject = mediaStream;
            userVideoRef.current.play()
        }
    }, [mediaStream])

    const createMeeting = (meetingInfo = {}) => {
        const meetingRoomConnection = io.connect('http://localhost:4200/');
        meetingRoomConnection.emit('createNamespace', {
            meetingName: `${meetingInfo.meetingName}`,
            meetingId: `${meetingInfo.meetingId}`,
            userName: `${meetingInfo.userName}`
        })
        meetingRoomConnection.on('message', handleSocketMessage);
        meetingRoomConnection.on('ack', (response) => joinMeeting(response,meetingInfo));
        setSocketConnection(meetingRoomConnection);
    }

    const joinMeeting = (response={},meetingInfo = {}) => {
        // console.log(response);
        const meetingRoomConnection = io.connect(`http://localhost:4200/${meetingInfo.meetingName}`);
        meetingRoomConnection.on('connect', handleSocketConnect);
        meetingRoomConnection.emit("message",{
            meetingName: `${meetingInfo.meetingName}`,
            meetingId: `${meetingInfo.meetingId}`,
            userName: `${meetingInfo.userName}`
        })
        meetingRoomConnection.on('message', handleSocketMessage);
        setSocketConnection(meetingRoomConnection);
    }


    const handleSocketMessage = (response) => {
        console.log(response);
    }

    const handleSocketConnect = (event) => {
        console.log("Joined to the chat room.");

    }

    const handleSocketEvent = (event) => {

        switch(event.type){

        }
        
    }


    return (
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
                            Welcome {meetingInfo.userName}
                        </Typography>
                        <Typography>
                            Meeting name : {meetingInfo.meetingName}
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