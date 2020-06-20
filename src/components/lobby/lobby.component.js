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
    log,
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
        if (mediaStream) {
            userVideoRef.current.srcObject = mediaStream;
            userVideoRef.current.play()
        }
    }, [mediaStream])


    useEffect(() => {
        let query = getQueryParams(location.search)
        setMeetingInfo(query);
        if (query.type === "create") {
            createMeeting(query);
        } else {
            joinMeeting({}, query);
        }
    }, [])



    const createMeeting = (meetingInfo = {}) => {
        const meetingRoomConnection = io.connect('http://localhost:4200/');
        meetingRoomConnection.on('connect', (event) => {
            setSocketConnection(meetingRoomConnection);
            handleSocketEvent({
                type: "connect",
                data: event,
                metaData: {
                    message: "Connected to the create meeting server."
                }
            });
            meetingRoomConnection.on('message', msg => handleSocketEvent({
                type: "message",
                data: msg
            }));
            meetingRoomConnection.on('disconnect', event => handleSocketEvent({
                type: "disconnect",
                data: event
            }));
            meetingRoomConnection.on('acknowledgement', response => handleSocketEvent(response));

            // Logic will go below
            meetingRoomConnection.emit('createMeeting', {
                meetingName: `${meetingInfo.meetingName}`,
                meetingId: `${meetingInfo.meetingId}`,
                userName: `${meetingInfo.userName}`
            })
        });
        meetingRoomConnection.on('error', error => handleSocketEvent({
            type: "error",
            data: error
        }));

    }

    const joinMeeting = (response = {}, meetingInfo = {}) => {
        const meetingRoomConnection = io.connect(`http://localhost:4200/${meetingInfo.meetingName}`);
        meetingRoomConnection.on('connect', (event) => {
            setSocketConnection(meetingRoomConnection);
            handleSocketEvent({
                type: "connect",
                data: event,
                metaData: {
                    message: "Connected to the meeting server."
                }
            });
            
            meetingRoomConnection.on('message', msg => handleSocketEvent({
                type: "message",
                data: msg
            }));
            meetingRoomConnection.on('disconnect', event => handleSocketEvent({
                type: "disconnect",
                data: event
            }));
            meetingRoomConnection.on('ack', response => handleSocketEvent(response));

            // Logic goes here
            meetingRoomConnection.emit("message", {
                meetingName: `${meetingInfo.meetingName}`,
                meetingId: `${meetingInfo.meetingId}`,
                userName: `${meetingInfo.userName}`
            });
        });
        meetingRoomConnection.on('error', error => handleSocketEvent({
            type: "error",
            data: error
        }));

    }


    const handleSocketEvent = ({type,data,metaData}) => {
        log({type,data})

        switch (type) {

            case "create":
                log(data);
                break;

            case "join":
                log(data);
                break;

            case "message":
                log(data);
                break;

            case "connect":
                log(metaData);
                break;

            case "disconnect":
                log(`Disconnected from server - ${data}`);
                break;

            case "error":
                log(`Error - ${data}`);
                break;

            default:
                log("Defualt case :",{type,data});
                break;

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