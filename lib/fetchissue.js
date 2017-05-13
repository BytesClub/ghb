/*
 * GHB - GitHub on Terminal
 * Copyright (C) 2017 Progyan Bhattacharya <admin@codeprogyan.me>
 * Maintained by: Bytes Club (https://bytesclub.github.io)<bytes-club@googlegroups.com>
 * Distributed under MIT License.
 */

'use strict';

const https = require('https')

var fetchIssue = (config, flag, callback) => {
	const states = ['open', 'closed', 'all']
	var fg = ''
	if (typeof flag == 'string' && states.indexOf(flag) !== -1)
		fg = '?state=' + flag
	else if (typeof flag == 'number')
		fg = '/' + flag.toString()
	else {
		let err = `Invalid argument specified for fetch issue.`
		throw err;
	}		
	const	pathUrl = config.url,
	        options = {
				hostname: 'api.github.com',
				path: pathUrl + '/issues' + fg,
				headers: {
					'Accepts': 'application/json',
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
			    }
	        }
	https.get(options, (res) => {
		if (res.statusCode !== 200){
			let err = `Error: Connection error occured. Please check your net connection and try later.`
			throw err;
		}
		let data = ''
		res.on('data', (chunk) => {
			data += chunk
		})
		res.on('end', () => {
			try {
				let issues = JSON.parse(data)
				if (typeof callback === 'function')
					callback(issues, config.path)
			} catch (e) {
				console.error(e.message)
			}
		})
	}).on('error', (err) => {
		throw err;
	})
}

module.exports = fetchIssue