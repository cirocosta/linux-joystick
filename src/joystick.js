'use strict';

var FS = require('fs')
  , EventEmitter = require('events').EventEmitter;

/**
 * Constructor for a Joytstick device
 * @param {number} id the ID of the js* input to
 * connect to.
 */
function Joystick (id) {
  this.wrap("onOpen");
  this.wrap("onRead");
  this.id = id;
  this.buffer = new Buffer(8);
}

Joystick.prototype.open = function () {
  FS.open("/dev/input/js" + id, "r", this.onOpen);
};

Joystick.prototype = Object.create(EventEmitter.prototype, {
  constructor: {value: Joystick}
});

Joystic.prototype.parse = function (buffer) {
  var event = {
    time: buffer.readUInt32LE(0),
    value: buffer.readInt16LE(4),
    number: buffer[7]
  };
  var type = buffer[6];

  if (type & 0x80) event.init = true;
  if (type & 0x01) event.type = "button";
  if (type & 0x02) event.type = "axis";

  return event;
};

// Register a bound version of a method and route errors
Joystick.prototype.wrap = function (name) {
  var self = this;
  var fn = this[name];

  this[name] = function (err) {
    if (err) return self.emit("error", err);

    return fn.apply(self, Array.prototype.slice.call(arguments, 1));
  };
};

Joystick.prototype.onOpen = function (fd) {
  this.fd = fd;
  this.startRead();
};

Joystick.prototype.startRead = function () {
  FS.read(this.fd, this.buffer, 0, 8, null, this.onRead);
};

Joystick.prototype.onRead = function (bytesRead) {
  var event = this.parse(this.buffer);

  event.id = this.id;
  this.emit(event.type, event);
  if (this.fd)
    this.startRead();
};

Joystick.prototype.close = function (callback) {
  FS.close(this.fd, callback);
  this.fd = undefined;
};

module.exports = Joystick;
