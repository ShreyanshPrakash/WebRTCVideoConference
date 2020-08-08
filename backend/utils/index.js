const { 
    iniLogFile,
    initLogFile,

    setLogFileDescriptor,
    getLogFileDescriptor,

    setLogFileName,
    getLogFileName, 

    log,
} = require('./logger.util');

const {
    setGlobalSocket,
    getGlobalSocket,
} = require('./common.util');


module.exports = {
    iniLogFile,
    initLogFile,
    
    setLogFileDescriptor,
    getLogFileDescriptor,

    setLogFileName,
    getLogFileName,

    log,

    setGlobalSocket,
    getGlobalSocket,
}