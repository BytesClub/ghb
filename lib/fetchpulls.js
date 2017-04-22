'use strict';

const  argv  = process.argv,
       index = argv[0].indexOf('ght') !== -1 ? 0 : 1

var fetchIssue = (config, issueFd, flag){
	const	pathUrl = config.url.replace('https://www.github.com', '/repos'),
	        fg = typeof flag !== 'undefined' && !flag ? 'closed' : 'open',
	        options = {
				hostname: 'api.github.com',
				path: pathUrl + '/pulls?state=' + fg,
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
			    }
	        }
	https.get(options, (res) => {
		if (res.statusCode !== 200){
			console.log(`Error: Connection error occured. Please check your net connection and try later.`)
			return false
		}
		let fd = fs.createWriteStream(pullsFd)
		res.on('data', (d) => {
			fd.write(d)
		})
		res.on('end', () => {
			fd.end()
		})
	}).on('error', (err) => {
		throw err;
	})
	return true
}

module.exports = fetchPulls
// Usage: this.fetchPulls(config.json, 'ght.pulls.json' [,options])