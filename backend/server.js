const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socket = require('socket.io')(http);
const cors = require('cors');

const { 
    loggerMiddleware, 
    staticServerMiddleware, 
} = require('./middlewares');
const {
    // iniLogFile,
    // setLogFileName,
    // setLogFileDescriptor,
    initLogFile,
    log,
} = require('./utils');
const {
    socketConnection,
} = require('./routes');




app.use(
    cors()
);
app.use(
    loggerMiddleware,
    staticServerMiddleware
)

// setLogFileName();
// setLogFileDescriptor();
// iniLogFile();

// initLogFile();

socket.on( 'connection', socketConnection)




app.get('/test', (req,res) => {
    res.json({
        name: "SP",
    })
})




http.listen( 
    4200, 
    () => {
        log("Listening at port 4200");
        log("Hello world")
    }
);


process.addListener('uncaughtException', handleUncaughtException)
process.addListener('unhandledRejection', handleUnhandledRejection)

function handleUncaughtException(event){
    // console.log(event)
}
function handleUnhandledRejection(event){
    console.log(event)
}