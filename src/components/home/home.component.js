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
import{
    CreateMeetingModel,
    JoinMeetingModel
} from 'src/models';

import './home.style.scss';

function HomeComponent() {

    const [createMeetingState, setCreateMeetingState] = useState();

    const handleCreateMeetingSubmit = useCallback( (submitData) => {
        console.log(submitData);
    })


    return (
        <React.Fragment>
            <Container maxWidth="xs" className="homeWrapper">
                <Grid container className="container">
                    <LogoComponent />
                    <FormBuilderComponent
                        formConfig={createMeetingFormConfig}
                        // formData={}
                        onFormSubmit={handleCreateMeetingSubmit}
                    />
                    <FormBuilderComponent
                        formConfig={joinMeetingFormConfig}
                    />
                </Grid>
            </Container>
        </React.Fragment>
    )

}

export {
    HomeComponent,
}