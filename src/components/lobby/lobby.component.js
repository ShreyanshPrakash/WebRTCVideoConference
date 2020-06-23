import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';


import io from 'socket.io-client';
import Peer from 'simple-peer';
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
            joinMeeting(query);
        }
    }, [])


    useEffect( () => {
        if(Object.keys( socketConnection ).length ){
            socketConnection.on('message', msg => handleSocketEvent({
                type: "message",
                data: msg,
            }));
            socketConnection.on('disconnect', event => handleSocketEvent({
                type: "disconnect",
                data: event,
            }));
            
            socketConnection.on('error', error => handleSocketEvent({
                type: "error",
                data: error
            }));
            socketConnection.on('joined', response => handleSocketEvent({
                type: "joined",
                data: response,
            }));
            
            initPeer(meetingInfo);
        }
    }, [socketConnection])


    const createMeeting = (meetingInfo = new MeetingInfoModel()) => {
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
            meetingRoomConnection.on('acknowledgement', response => handleSocketEvent({
                type: "acknowledgement",
                data: response,
                socketRef: meetingRoomConnection,
                meetingInfo: meetingInfo,
            }));
            // Logic will go below
            meetingRoomConnection.emit('createMeeting', {
                meetingName: `${meetingInfo.meetingName}`,
                meetingId: `${meetingInfo.meetingId}`,
                userName: `${meetingInfo.userName}`
            })
        });
    }

    const joinMeeting = (meetingInfo = {}) => {
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
            // Logic goes here
            meetingRoomConnection.emit("indentify", {
                meetingName: `${meetingInfo.meetingName}`,
                meetingId: `${meetingInfo.meetingId}`,
                userName: `${meetingInfo.userName}`
            });
        });
    }

    const initPeer = useCallback( () => {
        console.log("Init perr *******************")
        let peer = new Peer({
            initiator: meetingInfo.type === "create" ? true : false,
            stream: mediaStream,
            trickle: false,
        });
        peer.on('signal', signal => handlePeerEvents({
            type: "signal",
            data: signal,
        }));
        peer.on('stream', stream => handlePeerEvents({
            type: "stream",
            data: stream,
        }));
        peer.on('close', event => handlePeerEvents({
            type: "close",
            data: event,
        }));
    }, [socketConnection,meetingInfo])


    const handleSocketEvent = ({ type, data, metaData, meetingInfo }) => {
        log({ type, data })

        switch (type) {

            case "create":
                log(data);
                break;

            case "joined":
                log(data);
                initPeer(meetingInfo);
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

            case "acknowledgement":
                log('acknowledgement : ',data);
                joinMeeting(meetingInfo);
                break;

            default:
                log("Defualt case :", { type, data });
                break;

        }

    }

    const handlePeerEvents = useCallback( ({ type, data }) => {
        console.log({ type, data });
        console.log(socketConnection);
        switch (type) {

            case "signal":
                log('Signal : ', data)
                socketConnection.emit("signal",data);
                break;

            case "stream":
                log('stream : ', data)
                break;

            case "close":
                log('close : ', data)
                break;

            default:
                log('default : ', { type, data })
                break;
        }
    }, [socketConnection])

    const handleGoToMeeting = (event) => {
        socketConnection.send("Hello world");
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
                            onClick={handleGoToMeeting}
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