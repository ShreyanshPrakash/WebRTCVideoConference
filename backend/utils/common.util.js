
let io;
function setGlobalSocket(socket){
    io = socket;
}

function getGlobalSocket(){
    return io;
}

module.exports = {
    setGlobalSocket,
    getGlobalSocket,
}