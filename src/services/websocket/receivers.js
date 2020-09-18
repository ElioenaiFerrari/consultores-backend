const emitters = require('@/services/websocket/emitters');

module.exports = function (socket) {
  socket.on('message', emitters.message(socket));
};
