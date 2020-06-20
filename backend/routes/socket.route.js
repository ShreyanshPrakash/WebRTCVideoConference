const url = require('url');

const {
    getGlobalSocket,
} = require('./../utils');

function socketConnection(client, io){
    // console.log(url.parse(socket.request.headers.referer));
    console.log(`New client to global meeting`);
    client.on('createMeeting', req => createNamespace(client,io,req));
    

}


function createNamespace(client,io,req){
        console.log(`${req.userName} : ${req.meetingName} : Create Namespace`);
        let namespace = io.of(`${req.meetingName}`)
                            .on('connection', client => handleRoomJoin(client,io,req));
        // namespace.on('message', msg => console.log(msg))
        setChatMap(`${req.meetingName}-${req.meetingId}`,namespace);
        client.emit("acknowledgement", {
            type: "create",
            success: true,
            message: `Meeting created with name : ${req.meetingName}-${req.meetingId}`
        });
}

// function joinNamespace(client,socket){

// }

// so store all these socket connection to a redis and get the object when needed.
function handleRoomJoin(client,io,req){
    console.log(`${req.userName} : ${req.meetingName} : Join Room`);
    client.on("message", msg => console.log(msg));
    client.broadcast.emit("message",{
        userName : req.userName,
        meetingName : req.meetingName
    });
}

let chatRoomMap = new Map();
function getAllChatMap(){
    return chatRoomMap;
}

function setChatMap(key,value){
    chatRoomMap.set(key,value);
}

module.exports = {
    socketConnection,
}