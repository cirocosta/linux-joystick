var assert = require('assert')
	,	Joystick = require('../src/joystick');

describe('Joystick,' function () {
	it('should be sane', function () {
		assert(!!Joystick);
	});
});
