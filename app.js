/*
 * GHB - GitHub on Terminal
 * Copyright (C) 2017 Progyan Bhattacharya <admin@codeprogyan.me>
 * Maintained by: Bytes Club (https://bytesclub.github.io)
 * Distributed under MIT License.
 */

#!/usr/bin/env node
'use strict'

const  argv = process.argv,
       fs   = require('fs'),
       path = require('path'),
       GHT  = require('./lib/ght.js')

var CONFIG = path.resolve(__dirname, '.ghb'),
    FILE = '/.CONFIG',
    confFile = (CONFIG + FILE)
const helpStr =
`Usage: ghb [options] [parameter]
 init  : Initialize GHT in your repo
       Required parameter: [url]
 status: Show current state of GHB
 issue : Fetch and display issues
       Optional parameter: [open / closed]
 pulls : Fetch and display pull requests
       Optional parameter: [open / closed]`,
  infoStr =
`Invalid number of argumnet passed
ghb -h or ghb --help to see usage details.`

var ghb, index = 0

if ((index = argv.indexOf('-v')) !== -1 || (argv.indexOf('--version')) !== -1) {
	console.log('GHB v1.2.0')
} else if ((index = argv.indexOf('-h')) !== -1 || (argv.indexOf('--help')) !== -1) {
	console.log(helpStr)
} else if ((index = argv.indexOf('init')) !== -1) {
	if (typeof argv[index + 1] === 'string') {
		ghb = new GHT({data: argv[index + 1], type: 'url'})
	} else
		console.log(infoStr)
} else if ((index = argv.indexOf('status')) !== -1) {
	ghb = new GHT({data: confFile, type: 'json'})
	if (typeof ghb === 'undefined' || (Object.keys(ghb).length === 0 && ghb. constructor === Object)) {
		let err = `GitHub Terminal has not been initiated in this repository.`
		throw err;
	} else
		console.log('Repository: Github\nURL:', ghb.get_url)
} else if ((index = argv.indexOf('issues')) !== -1) {
	ghb = new GHT({data: confFile, type: 'json'})
	if (typeof ghb === 'undefined' || (Object.keys(ghb).length === 0 && ghb. constructor === Object)) {
		let err = `GitHub Terminal has not been initiated in this repository.`
		throw err;
	}
	if (typeof argv[index + 1] === 'string') {
		let state = argv[index + 1]
		if (state !== 'open' && state !== 'closed' && state !== 'all'){
			console.log(helpStr)
			process.exit(0)
		}
		ghb.getIssues(state)
	} else
		ghb.getIssues('open')
} else if ((index = argv.indexOf('pulls')) !== -1) {
	ghb = new GHT({data: confFile, type: 'json'})
	if (typeof ghb === 'undefined' || (Object.keys(ghb).length === 0 && ghb. constructor === Object)) {
		let err = `GitHub Terminal has not been initiated in this repository.`
		throw err;
	}
	if (typeof argv[index + 1] === 'string') {
		let state = argv[index + 1]
		if (state !== 'open' && state !== 'closed' && state !== 'all'){
			console.log(helpStr)
			process.exit(0)
		}
		ghb.getPulls(state)
	} else
		ghb.getPulls('open')
} else {
	console.log(infoStr)
}

process.on('exit', () => {
	if (typeof ghb !== 'undefined' && !(Object.keys(ghb).length === 0 && ghb. constructor === Object))
		ghb.dump = {dir: CONFIG, file: FILE}
})