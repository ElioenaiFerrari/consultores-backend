require('module-alias/register');
const socketIo = require('socket.io');
const receivers = require('@/services/websocket/receivers');

module.exports = function (http) {
  const io = socketIo(http);

  io.on('connection', receivers);

  return io;
};
