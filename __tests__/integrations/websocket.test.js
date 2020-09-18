require('dotenv/config');

describe('Websocket', function () {
  it('verify if socket are send and receive message', function () {
    const io = require('socket.io-client')(
      `http://localhost:${process.env.PORT}`
    );

    io.emit('message', 'Hello World');

    io.on('message2', function (message) {
      expect(message).toBe('Hello Machine');
    });
  });
});
