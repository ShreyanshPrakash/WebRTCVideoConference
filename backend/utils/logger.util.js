const fs = require('fs');
const path = require('path');
const os = require('os');


let logFileName;
function setLogFileName(name){
    if( name ){
        logFileName = name;
    }else{
        logFileName = `logFile-${new Date().getTime()}.txt`;
    }
}

function getLogFileName(){
    return logFileName;
}


let logFileDescriptor;
function setLogFileDescriptor(fd){
    if( fd ){
        logFileDescriptor = fd;
    }else{
        fs.open(
            path.join(
                __dirname,
                '../',
                'logs',
                getLogFileName()
            ),
            'a',
            (err,fd) => {
                if(!err){
                    logFileDescriptor = fd;
                }else{
                    console.log(err);
                }
            }
        );
    }
}

function getLogFileDescriptor(){
    return logFileDescriptor;
}




function generateLogFile(){
    let date = new Date();
    fs.mkdirSync(
        path.join(
            __dirname,
            '../',
            'logs'
        ),
        { recursive: true },
        ( err ) => {
            if( !err ){
                fs.writeSync(
                    path.join(
                        __dirname,
                        '../',
                        'logs',
                        getLogFileName()
                    ),
                    `***************************************** Log Init [${date.toDateString()} ${date.toTimeString()}] *****************************************${os.EOL}${os.EOL}`,
                    (err) => {
                        if( err ){
                            console.log(err)
                        }
                    }
                )
            }else{
                console.log( err );
            }
        }
    )
    
}



function initLogFile(){
    setLogFileName();
    generateLogFile();
    setLogFileDescriptor();
}



function log(message){
    // fs.write(
    //     getLogFileDescriptor(),
    //     message,
    //     (err) => {
    //         console.log(err)
    //     }
    // )

    console.log(
        message,
        payload
    )
}



module.exports = {
    initLogFile,
    generateLogFile,

    setLogFileDescriptor,
    getLogFileDescriptor,

    setLogFileName,
    getLogFileName,

    log,
}