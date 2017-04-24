'use strict';

var fetchIssue = (config, issues, flag) => {
	const states = ['open', 'closed', 'all']
	if (states.indexOf(flag) == -1) {
		let err = `Invalid argument specified for fetch issue.`
		throw err;
	}
	const	pathUrl = config.url.replace('https://www.github.com', '/repos'),
	        fg = typeof flag === 'string' ? flag : 'open',
	        options = {
				hostname: 'api.github.com',
				path: pathUrl + '/issues?state=' + fg,
				headers: {
					'Accepts': 'application/json',
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
			    }
	        }
	https.get(options, (res) => {
		if (res.statusCode !== 200){
			console.log(`Error: Connection error occured. Please check your net connection and try later.`)
			return false
		}
		let data = ''
		res.on('data', (chunk) => {
			data += chunk
		})
		res.on('end', () => {
			try {
				issues = JSON.parse(d)
			} catch (e) {
				console.log(e.message)
			}
		})
	}).on('error', (err) => {
		throw err;
	})
	return true
}

module.exports = fetchIssue