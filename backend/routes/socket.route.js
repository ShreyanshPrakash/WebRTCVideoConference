const url = require('url');

const {
    getGlobalSocket,
} = require('./../utils');

function socketConnection(client, socket){

    // console.log(socket.request.headers.referer);
    // console.log(url.parse(socket.request.headers.referer));
    console.log("******************************************")
    client.on('join', req => {
        client.broadcast.send( `${req.userName} has joined the chat.` );
        client.join(`${req.meetingName}`)
        console.log(`${req.userName} : ${req.meetingName}`);
        client.emit("ack", {
            type: "join",
            success: true,
            message: "Join success."
        })
        // client.broadcast.to(`${req.meetingName}`).emit("message", "Joined chat ***");
        socket.of(`${req.meetingName}`).on('connection', client => handleRoomJoin(client,req));
    });

    

}

// so store all these socket connection to a redis and get the object when needed.
function handleRoomJoin(client,req){
    console.log(`${req.meetingName} : ${req.userName}`);
    socket.broadcast.emit("message",{
        userName : req.userName,
        meetingName : req.meetingName
    });
}

let chatRoomMap = new Map();
function getAllChatMap(){
    return chatRoomMap;
}

function setChatMap(key,value){
    chatRoomMap.set(key,value)
    console.log(chatRoomMap);
}

module.exports = {
    socketConnection,
}