'use strict';

var Joystick = require('../src/joystick')
	,	js = new Joystick(0);

js.connect();
js.on('button', console.log);
js.on('axis', console.log);

setTimeout(function () {
 js.close();
}, 5000);
