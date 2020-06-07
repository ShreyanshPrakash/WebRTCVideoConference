import React, {useState, useCallback} from 'react';
import { useHistory } from 'react-router-dom';

import {
    Container, Grid, Button,
} from '@material-ui/core';


import {
    LogoComponent,
    FormBuilderComponent,
} from "src/reuseableComp";
import {
    createMeetingFormConfig,
    joinMeetingFormConfig,
} from "src/components/home/meetingForm.config";


import './home.style.scss';

function HomeComponent() {

    const history = useHistory();

    const handleCreateMeetingSubmit = useCallback( (submitData) => {
        console.log(submitData);
        history.push("/lobby");
    });

    const handleJoinMeetingSubmit = useCallback( (submitData) => {
        console.log(submitData);
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