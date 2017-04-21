/*
 * ght is a command line tool for GitHub at Terminal
 *
 * Sample Usage:
 *
 * $ ght config
 * Username: <username>
 * Password: <password>
 *
 * $ ght add url <url>
 *
 * $ ght get issue [open/closed]
 *
 * $ ght add issue
 *
 * $ ght get pulls [open/merged/closed]
 *
 * $ ght add pulls
 *
 */

'use strict'
const	argv  = process.argv,
	https = require('https'),
	fs    = require('fs'),
	readL = require('readline'),
	conf  = './ght.config.json',
	issue = './ght.issue.json',
	pulls = './ght.pull.json'

let index = argv[0] === 'ght' ? 0 : 1

var config = JSON.parse(fs.readFileSync(conf, 'utf8'))

const	rL = readL.createInterface({
		input: process.stdin,
		output: process.stdout
	}),
	host = 'api.github.com',
	pathUrl = config.url.replace('https://www.github.com', '/repos')

switch (argv[index + 1]) {
	/*	Configuration settings	*/
	case 'config':
		rL.question('Username: ', (user) => {
			config.user = user
			fs.writeFileSync(conf, JSON.stringify(config), 'utf8')
			rL.close()
			process.exit(0)
		})
		break
	/*	Set URL to config file	*/
	case 'set-url':
		if (typeof argv[index + 2] === 'undefined')
			throw `Fatal Error: No Git url specified!\n\nUsage: ${argv[index]} set-url <url>`
		config.url = argv[index + 2]
		fs.writeFileSync(conf, JSON.stringify(config), 'utf8')
		process.exit(0)
		break
	/*	Fetch Operation over issue/pr	*/
	case 'fetch':
		if (typeof config === 'undefined' || (Object.keys(config).length === 0 && config. constructor === Object) || typeof config.url === 'undefined')
			throw `Fatal Error: Git url is not defined!\n\nUsage: ${argv[index]} set-url <url>`
		switch (argv[index + 2]) {
			/*	Operation `fetch issue`	*/
			case 'issue':
				https.get({
					hostname: host,
					path: pathUrl + '/issues',
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
					}
				}, 
					(res) => {
						if (res.statusCode !== 200)
							throw `Error: Connection error occured. Please check your net connection and try later.`
						let fd = fs.createWriteStream(issue)
						res.on('data', (d) => {
							fd.write(d)
						})
						res.on('end', () => {
							fd.end()
							process.exit(0)
						})
					}).on('error', (err) => {
						throw err
					})
				break
			/*	Operation `fetch pulls`	*/
			case 'pulls':
				https.get({
					hostname: host,
					path: pathUrl + '/pulls',
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
					}
				}, 
					(res) => {
						if (res.statusCode !== 200)
								throw `Error: Connection error occured. Please check your net connection and try later.`
						let fd = fs.createWriteStream(pulls)
						res.on('data', (d) => {
							fd.write(d)
						})
						res.on('end', () => {
							fd.end()
							process.exit(0)
						})
					}).on('error', (err) => {
						throw err
					})
				break
			default:
				throw `Fatal Error: Invalid Git operation specified!\n\nUsage: ${argv[index]} get [options]\nOptions:\nissue: Get Issues\npulls: Get Pull Requests`
		}
		break
	/*	View Operation	*/
	case 'view':
		switch (argv[index + 2]) {
			/*	Operation `view issue`	*/
			case 'issue':
				let issues = JSON.parse(fs.readFileSync(issue, 'utf8'))
				if (typeof issues === 'undefined' || (Object.keys(issues).length === 0 && issues. constructor === Object))
					throw `Fatal Error: Git issue not found in given url!\n\nUse ${argv[index]} get issue to get the latest.`
				issues.forEach((val, index, arr) => {
					console.log('\x1b[33m%s #%s\x1b[0m', val.title, val.number)
					console.log('\x1b[37m%s\x1b[0m', val.body)
					val.labels.forEach((label) => {
						console.log('\x1b[41m\x1b[37m%s\x1b[0m', label.name)
					})
					console.log('\x1b[36mCreated by: %s\x1b[0m', val.user.login)
					if (val.assignee){
						console.log('\x1b[32mAssigned to:')
						val.assignees.forEach((as) => {
							console.log('* %s', as.login)
						})
					}
					console.log('\x1b[0m')
				})
				process.exit(0)
				break
			/*	Operation `view pulls`	*/
			case 'pulls':
				let pullRq = JSON.parse(fs.readFileSync(pulls, 'utf8'))
				if (typeof pullRq === 'undefined' || (Object.keys(pullRq).length === 0 && pullRq. constructor === Object))
					throw `Fatal Error: Git pull request not found in given url!\n\nUse ${argv[index]} get pulls to get the latest.`
				pullRq.forEach((val, index, arr) => {
					console.log('\x1b[33m%s #%s\x1b[0m', val.title, val.number)
					console.log('\x1b[37m%s\x1b[0m', val.body)
					console.log('\x1b[41m\x1b[37m%s\x1b[0m', val.state)
					console.log('\x1b[36mCreated by: %s\x1b[0m', val.user.login)
					if (val.assignee){
						console.log('\x1b[32mAssigned to:')
						val.assignees.forEach((as) => {
							console.log('* %s', as.login)
						})
					}
					console.log('\x1b[0m')
				})
				process.exit(0)
				break
			default:
				throw `Fatal Error: Invalid Git operation specified!\n\nUsage: ${argv[index]} view [options]\nOptions:\nissue: View Issues\npulls: View Pull Requests`
		}
	break
}