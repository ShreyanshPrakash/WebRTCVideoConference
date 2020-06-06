import React, {useState, useCallback} from 'react';
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
} from "src/components/meetingForm.config";


import './home.style.scss';

function HomeComponent() {

    const handleCreateMeetingSubmit = useCallback( (submitData) => {
        console.log(submitData);
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
                        onFormSubmit={handleJoinMeetingSubmit}
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