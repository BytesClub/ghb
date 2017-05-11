/*
 * GHB - GitHub on Terminal
 * Copyright (C) 2017 Progyan Bhattacharya <admin@codeprogyan.me>
 * Maintained by: Bytes Club (https://bytesclub.github.io)<bytes-club@googlegroups.com>
 * Distributed under MIT License.
 */

'use strict';

var display = (val) => {
	// Title and Pull Request Number in Yellow fg
	console.log('\x1b[33m%s #%s\x1b[0m', val.title, val.number)
	// Body of Pull Request in White fg
	console.log('\x1b[37m%s\x1b[0m', val.body)
	// Current State in Red bg and White fg
	console.log('\x1b[41m\x1b[37m%s\x1b[0m', val.state)
	// User-ID of creator in Cyan fg
	console.log('\x1b[36mCreated by: %s\x1b[0m', val.user.login)
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

var viewPulls = (pulls) => {
	if (typeof pulls === 'undefined' || pulls.length === 0){
		console.error('No Pull Request to show!')
		return false
	}
	if (!Array.isArray(pulls))
		display(pulls)
	else
		pulls.forEach((val, index, arr) => {
			display(val)
		})
	return true
}

module.exports = viewPulls