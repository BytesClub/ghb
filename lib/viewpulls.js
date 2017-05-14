/*
 * GHB - GitHub on Terminal
 * Copyright (C) 2017 Progyan Bhattacharya <admin@codeprogyan.me>
 * Maintained by: Bytes Club (https://bytesclub.github.io)<bytes-club@googlegroups.com>
 * Distributed under MIT License.
 */

'use strict';

const fs = require('fs'),
      md = require('./markdown.js')

var display = (val) => {
	// Title and Pull Request Number in Yellow fg
	console.log('\x1b[1m\x1b[33m%s #%s\x1b[0m', val.title, val.number)
	// Body of Pull Request in White fg
	console.log('\x1b[37m%s\x1b[0m', md(val.body))
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

var viewPulls = (pulls, path) => {
	if (typeof pulls === 'undefined' || pulls.length === 0){
		console.error('No Pull Request to show!')
		return false
	}
	if (!Array.isArray(pulls))
		display(pulls)
	else
		pulls.forEach(display)
	try {
		if (!fs.existsSync(path.dir)) {
			fs.mkdirSync(path.dir)
		}
		let fPath = path.dir + '/' + path.file
		let fData = fs.readFileSync(fPath, 'utf8')
		let json = JSON.parse(fData)
		json.pull.pulls = pulls
		fs.writeFileSync(fPath, JSON.stringify(json), 'utf8')
	} catch(e) {
		let err = `Invalid Error Occured: Make sure GitHub Terminal has correct permissions.`
		throw err;
	}
	return true
}

module.exports = viewPulls