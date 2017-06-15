/*
 * GHB - GitHub on Terminal
 * Copyright (C) 2017 Progyan Bhattacharya <admin@codeprogyan.me>
 * Maintained by: Bytes Club (https://bytesclub.github.io)<bytes-club@googlegroups.com>
 * Distributed under MIT License.
 */

'use strict';

const fs  = require('fs'),
      dsp = require('./display.js')

var viewIssue = (issues, path) => {
	if (typeof issues === 'undefined' || issues.length === 0) {
		console.error('No Issue to show!')
		return false
	}
	if (!Array.isArray(issues)) {
		dsp(issues)
	} else {
		issues.forEach(dsp)
	}
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
