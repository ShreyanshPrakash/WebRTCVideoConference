import React from 'react';

import {
    Grid,
} from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

import './logo.style.scss';

function LogoComponent() {


    return (
        <React.Fragment>
            <Grid container spacing={2} justify="center" className="logo">
                <AccountCircleOutlinedIcon />
            </Grid>
        </React.Fragment>
    )
}

export {
    LogoComponent,
}