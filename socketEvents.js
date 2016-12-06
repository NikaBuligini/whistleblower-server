function createSocket(io) {
  // has socket param
  io.on('connection', () => {
    console.log('a user connected');
  });
}

module.exports = createSocket;
