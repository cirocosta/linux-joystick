#!/usr/bin/env node

'use strict';

var Joystick = require('../src/joystick')
	,	js = new Joystick(0)
	,	timer;

function connector (fn) {
	var isConnected = false
		,	timer = null;

	return function (connected) {
		isConnected = connected;

		if (isConnected) {
			clearTimeout(timer);
		} else {
			clearTimeout(timer);
			timer = setTimeout(function () {
				fn();
			}, 600);
		}
	};
}

var conn = connector(function () {
	js.connect();
});

js.on('action', function (ev) {
	console.log(ev);
});

js.on('connect', function () {
	console.log("conectou! :)");
	conn(true);
});

js.on('disconnect', function (err) {
	js.close();
	console.log("disconectou :(");
  conn(false);
});

js.on('notFound', function (err) {
	js.close();
	console.log("nao encontrou :(");
  conn(false);
});

conn();
