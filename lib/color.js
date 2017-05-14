/*
 * GHB - GitHub on Terminal
 * Copyright (C) 2017 Progyan Bhattacharya <admin@codeprogyan.me>
 * Maintained by: Bytes Club (https://bytesclub.github.io)<bytes-club@googlegroups.com>
 * Distributed under MIT License.
 */

'use strict';

var colorLabel = (color) => {
	switch(color) {
		case 'b60205': case 'd93f0b': case 'ee0701':
			return '\x1b[41m\x1b[37m'
		case 'fbca04':
			return '\x1b[43m\x1b[30m'
		case '0e8a16':
			return '\x1b[42m\x1b[37m'
		case '006b75':
			return '\x1b[46m\x1b[37m'
		case '1d76db': case '0052cc': case '84b6eb':
			return '\x1b[44m\x1b[37m'
		case '5319e7':
			return '\x1b[44m\x1b[37m'
		default:
			return '\x1b[47m\x1b[34m'
	}
}

module.exports = colorLabel