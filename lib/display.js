/*
 * GHB - GitHub on Terminal
 * Copyright (C) 2017 Progyan Bhattacharya <admin@codeprogyan.me>
 * Maintained by: Bytes Club (https://bytesclub.github.io)<bytes-club@googlegroups.com>
 * Distributed under MIT License.
 */

'use strict';

const md  = require('./markdown.js'),
      col = require('./color.js')

var display = (val) => {
	// Title and Issue Number in Yellow fg
	// Current State in Magenta bg and White fg	
	console.log('\x1b[1m\x1b[33m%s #%s\x1b[22m \x1b[45m\x1b[37m%s\x1b[0m', val.title, val.number, val.state)
	// Body of issue in White fg
	console.log('\x1b[37m%s\x1b[0m', md(val.body))
	val.labels.forEach((label) => {
		// Labels associated
		console.log('%s%s\x1b[0m\x1b[22m', col(label.color), label.name)
	})
	// User-ID of creator in Cyan fg
	console.log('\x1b[36mCreated by: %s', val.user.login)
	if (val.assignee){
		// Assignee list in Green fg
		console.log('\x1b[32mAssigned to:')
		val.assignees.forEach((as) => {
			console.log('* %s', as.login)
		})
	}
	// Reset to default
	console.log('\x1b[0m')
}

module.exports = display