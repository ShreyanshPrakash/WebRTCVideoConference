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
        client.broadcast.to(`${req.meetingName}`).emit("message", "Joined chat ***");
        // getGlobalSocket().of(`${req.meetingName}-${req.meetinId}`).on('connection', handleRoomJoin);
    });

    

}

function handleRoomJoin(socket){
    console.log("Joined room");
    socket.emit("message","Joined successfull");
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