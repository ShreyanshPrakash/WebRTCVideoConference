const url = require('url');

const {
    getGlobalSocket,
} = require('./../utils');

function socketConnection(client, socket){
    // console.log(socket.request.headers.referer);
    // console.log(url.parse(socket.request.headers.referer));
    console.log(`New entry to global meeting`);
    client.on('createNamespace', req => createNamespace(client,socket,req));
    // client.on('joinNamespace', req => joinNamespace(client,socket,req));
    

}


function createNamespace(client,socket,req){
        console.log(`${req.userName} : ${req.meetingName} : Create Namespace`);
        let namespace = socket.of(`${req.meetingName}`)
                            .on('connection', client => handleRoomJoin(client,socket,req));
        namespace.on('message', msg => console.log(msg))
        setChatMap(`${req.meetingName}-${req.meetingId}`,namespace);
        client.emit("ack", {
            type: "create",
            success: true,
            message: `Meeting created with name : ${req.meetingName}-${req.meetingId}`
        });
}

// function joinNamespace(client,socket){

// }

// so store all these socket connection to a redis and get the object when needed.
function handleRoomJoin(client,socket,req){
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