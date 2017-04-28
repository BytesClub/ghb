#!/usr/bin/env node

'use strict'

const  argv = process.argv,
       fs   = require('fs'),
       path = require('path'),
       GHT  = require('./lib/ght.js')

var CONFIG = path.resolve(__dirname, '.ght'),
    confFile = CONFIG + '/.CONFIG'
const helpStr =
`Usage: ght [options] [parameter]
 init  : Initialize GHT in your repo
       Required parameter: [url]
 issue : Fetch and display issues
       Optional parameter: [open / closed]
 pulls : Fetch and display pull requests
       Optional parameter: [open / closed]`,
  infoStr =
`Invalid number of argumnet passed
ght -h or ght -help to see usage details.`

var ght, index = 0

if ((index = argv.indexOf('-h')) !== -1 || (argv.indexOf('-help')) !== -1) {
	console.log(helpStr)
} else if ((index = argv.indexOf('init')) !== -1) {
	if (typeof argv[index + 1] === 'string') {
		ght = new GHT({data: argv[index + 1], type: 'url'})
	} else
		console.log(infoStr)
} else if ((index = argv.indexOf('status')) !== -1) {
	ght = new GHT({data: confFile, type: 'json'})
	if (typeof ght === 'undefined' || (Object.keys(ght).length === 0 && ght. constructor === Object)) {
		let err = `GitHub Terminal has not been initiated in this repository.`
		throw err;
	} else
		console.log('Repository: Github\nURL:', ght.get_url)
} else if ((index = argv.indexOf('issues')) !== -1) {
	ght = new GHT({data: confFile, type: 'json'})
	if (typeof ght === 'undefined' || (Object.keys(ght).length === 0 && ght. constructor === Object)) {
		let err = `GitHub Terminal has not been initiated in this repository.`
		throw err;
	}
	if (typeof argv[index + 1] === 'string') {
		let state = argv[index + 1]
		if (state !== 'open' && state !== 'closed' && state !== 'all'){
			console.log(helpStr)
			process.exit(0)
		}
		ght.getIssues(state)
	} else
		ght.getIssues('open')
} else if ((index = argv.indexOf('pulls')) !== -1) {
	ght = new GHT({data: confFile, type: 'json'})
	if (typeof ght === 'undefined' || (Object.keys(ght).length === 0 && ght. constructor === Object)) {
		let err = `GitHub Terminal has not been initiated in this repository.`
		throw err;
	}
	if (typeof argv[index + 1] === 'string') {
		let state = argv[index + 1]
		if (state !== 'open' && state !== 'closed' && state !== 'all'){
			console.log(helpStr)
			process.exit(0)
		}
		ght.getPulls(state)
	} else
		ght.getPulls('open')
} else {
	console.log(infoStr)
}

process.on('exit', () => {
	if (typeof ght !== 'undefined' && !(Object.keys(ght).length === 0 && ght. constructor === Object))
		ght.dump = confFile
})