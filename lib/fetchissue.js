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
	if (flag.key === 'state' && typeof flag.value == 'string' && states.indexOf(flag.value) !== -1)
		fg = '?state=' + flag.value
	else if (flag.key === 'id' && typeof flag.value == 'number')
		fg = '/' + flag.value.toString()
	else if (flag.key === 'label' && typeof flag.value === 'string')
		fg = '?labels=' + flag.value.replace(/[\s]/, '+')
	else {
		let err = `Invalid argument specified for fetch issue.`
		throw err;
	}		
	const	pathUrl = config.url,
	        options = {
				hostname: 'api.github.com',
				path: encodeURI(pathUrl + '/issues' + fg),
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