const url = require('url');

const {
    getGlobalSocket,
    log,
} = require('./../utils');

function socketConnection(client, io) {
    // console.log(url.parse(socket.request.headers.referer));
    // console.log(io.engine.clientsCount)
    // console.log(client.id);
    // console.log(`New client to global meeting`);
    client.on('createMeeting', req => createNamespace(client, io, req));
}


function createNamespace(client, io, req) {
    // console.log(`${req.userName} : ${req.meetingName} : Create Namespace`);
    let namespace = io.of(`${req.meetingName}`)
        .on('connection', client => handleRoomJoin(client, io));

    setChatMap(`${req.meetingName}-${req.meetingId}`, namespace);

    client.emit('meetingCreated', {
        type: "create",
        success: true,
        message: `Meeting created with name : ${req.meetingName}-${req.meetingId}`
    });

    log(
        "Created new personal meeting : ",
        req
    )

    console.log(
        "Created new personal meeting : ",
        req
    )

}

// so store all these socket connection to a redis and get the object when needed.
function handleRoomJoin(client, io) {
    // console.log(`${req.userName} : ${req.meetingName} : Join Room`);
    client.on("userCheckin", res => {
        console.log(res)
        client.broadcast.emit("newUser", res);
    });

    
    client.on("message", msg => {
        client.broadcast.emit("message", msg)
    });
    client.on("offer", offer => console.log(offer));
    client.on("signal", signal => {
        client.broadcast.emit("offer", signal)
    });
}

let chatRoomMap = new Map();
function getAllChatMap() {
    return chatRoomMap;
}

function setChatMap(key, value) {
    chatRoomMap.set(key, value);
}

module.exports = {
    socketConnection,
}