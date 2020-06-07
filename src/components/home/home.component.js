import React, {useState, useCallback} from 'react';
import { useHistory } from 'react-router-dom';

import {
    Container, Grid, Button,
} from '@material-ui/core';


import {
    LogoComponent,
    FormBuilderComponent,
} from "src/reuseableComponents";
import {
    createMeetingFormConfig,
    joinMeetingFormConfig,
} from "src/components/home/meetingForm.config";
import {
    getuuid,
} from 'src/utils';


import './home.style.scss';

function HomeComponent() {

    const history = useHistory();

    const handleCreateMeetingSubmit = useCallback( (submitData) => {
        const {
            createMeetingForm: {
                createMeeting: {
                    meetingName,
                    userName,
                }
            }
        } = submitData;
        history.push(`/lobby?userName=${userName}&meetingName=${meetingName}&meetingId=${getuuid()}&type=create`);
    });

    const handleJoinMeetingSubmit = useCallback( (submitData) => {
        const {
            joinMeetingForm: {
                joinMeeting: {
                    meetingName,
                    userName,
                }
            }
        } = submitData;
        // need to parse meeting name.
        history.push(`/lobby?userName=${userName}&meetingName=${meetingName}&type=join`);
    })


    return (
        <React.Fragment>
            <Container maxWidth="xs" className="homeWrapper">
                <Grid container className="container">
                    <LogoComponent />
                    <FormBuilderComponent
                        formConfig={createMeetingFormConfig}
                        onFormSubmit={handleCreateMeetingSubmit}
                    />
                    <FormBuilderComponent
                        formConfig={joinMeetingFormConfig}
                        onFormSubmit={handleJoinMeetingSubmit}
                    />
                </Grid>
            </Container>
        </React.Fragment>
    )

}

export {
    HomeComponent,
}