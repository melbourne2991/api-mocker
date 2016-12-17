const io = require('socket.io');
const morgan = require('morgan');
const stream = require('stream');

class LoggerWriter extends stream.Writable {
  constructor(client, writableOpts) {
    super(writableOpts);
    this.client = client;
  }

  _write(chunk, encoding, done) {
    this.client.emit('log', chunk.toString());
    done();
  }
}

class Logger {
  constructor(port = 3111) {
    this.socket = io();
    this.socket.listen(port);
    this.socket.on('connection', (client) => {
      this.log = morgan('combined', {
        stream: new LoggerWriter(client)
      });
    });
  }
}

module.exports = function() {
  return new Logger();
}