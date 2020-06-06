const fs = require('fs');
const path = require('path');
const os = require('os');

const { 
    getLogFileDescriptor, 
} = require('../utils');


const loggerMiddleware = (req,res,next) => {
    let logFileRef = getLogFileDescriptor();
    fs.writeFile( 
        logFileRef,
        `${req.url}${os.EOL}`
    )
    next();
}

module.exports = {
    loggerMiddleware,
}