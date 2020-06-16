

function socketConnection(socket){

    // console.log(socket);
    socket.emit('message',{name:'connected'})

}

module.exports = {
    socketConnection,
}