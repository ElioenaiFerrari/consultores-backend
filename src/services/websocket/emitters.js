module.exports = {
  message(socket) {
    return function (payload) {
      console.log(`receive message ${payload} to ${socket.id}`);

      socket.emit('message2', 'Hello Machine');
    };
  },
};
