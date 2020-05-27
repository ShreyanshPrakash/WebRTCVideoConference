import React from 'react';

import {
    Container, Grid
} from '@material-ui/core';
import {
    LogoComponent,
    FormBuilderComponent,
} from "src/reuseableComp";
import {
    createMeetingForm,
} from "src/components/createMeetingForm.config";

import './home.style.scss';

function HomeComponent() {


    return (
        <React.Fragment>
            <Container maxWidth="xs" className="homeWrapper">
                <Grid container className="container">
                    <LogoComponent />
                    <FormBuilderComponent
                        formConfig={createMeetingForm}
                    />
                </Grid>
            </Container>
        </React.Fragment>
    )

}

export {
    HomeComponent,
}