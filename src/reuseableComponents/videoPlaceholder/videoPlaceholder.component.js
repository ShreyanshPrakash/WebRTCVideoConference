import React from 'react';

import {
    Grid,
    IconButton,
} from '@material-ui/core';

import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import SettingsIcon from '@material-ui/icons/Settings';

import './videoPlaceholder.style.scss';

const VideoPlaceholderComponent = React.forwardRef(({ config, ...rest }, ref) => {

    return (
        <React.Fragment>
            <Grid className="videoPlaceholderWrapper">
                <Grid container className="videoWrapper">
                    <video
                        className="userVideoStream"
                        ref={ref}
                        muted={config.muted}
                    >
                    </video>
                </Grid>
                <Grid container justify="space-evenly" alignItems="center" className="videoButtonsWrapper">
                    <Grid item>
                        <IconButton>
                            <MicIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton>
                            <VideocamIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton>
                            <SettingsIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )

})

export {
    VideoPlaceholderComponent,
}