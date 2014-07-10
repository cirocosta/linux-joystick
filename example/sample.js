#!/usr/bin/env node

'use strict';

var Joystick = require('../src/joystick')
	,	js = new Joystick(0);

js.connect();

js.on('action', function (ev) {
	console.log(ev);
});
js.on('connect', function () {
	console.log("conectou! :)");
});
js.on('disconnect', function (err) {
	console.log("disconectou :(");
});
js.on('notFound', function (err) {
	console.log("nao encontrou :(");
});

// function fn () {
// 	js.connect();
// }

// var timer = setInterval(fn, 500);
// fn();
