/*
 * GHB - GitHub on Terminal
 * Copyright (C) 2017 Progyan Bhattacharya <admin@codeprogyan.me>
 * Maintained by: Bytes Club (https://bytesclub.github.io)<bytes-club@googlegroups.com>
 * Distributed under MIT License.
 */

'use strict';

const fs  = require('fs'),
      md  = require('./markdown.js'),
      col = require('./color.js')

var display = (val) => {
	// Title and Issue Number in Yellow fg
	console.log('\x1b[1m\x1b[33m%s #%s\x1b[22m', val.title, val.number)
	// Body of issue in White fg
	console.log('\x1b[37m%s\x1b[0m', md(val.body))
	val.labels.forEach((label) => {
		// Labels associated are in Red bg and White fg
		console.log('%s%s\x1b[0m\x1b[22m', col(label.color), label.name)
	})
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

var viewIssue = (issues, path) => {
	if (typeof issues === 'undefined' || issues.length === 0){
		console.error('No Issue to show!')
		return false
	}
	if (!Array.isArray(issues))
		display(issues)
	else
		issues.forEach(display)
	try {
		if (!fs.existsSync(path.dir)) {
			fs.mkdirSync(path.dir)
		}
		let fPath = path.dir + '/' + path.file
		let fData = fs.readFileSync(fPath, 'utf8')
		let json = JSON.parse(fData)
		json.issue.issues = issues
		fs.writeFileSync(fPath, JSON.stringify(json), 'utf8')
	} catch(e) {
		let err = `Invalid Error Occured: Make sure GitHub Terminal has correct permissions.`
		throw err;
	}
	return true
}

module.exports = viewIssue