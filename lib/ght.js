/*
 * GHB - GitHub on Terminal
 * Copyright (C) 2017 Progyan Bhattacharya <admin@codeprogyan.me>
 * Maintained by: Bytes Club (https://bytesclub.github.io)<bytes-club@googlegroups.com>
 * Distributed under MIT License.
 */

'use strict';

const  fs     = require('fs'),
       dns    = require('dns'),
       Issue  = require('./issue.js'),
       Pulls  = require('./pulls.js')

class GitHubT {
	constructor(props) {
		if (props.type === 'json') {
			try {
				let fdata = fs.readFileSync(props.data, 'utf8')
				let json = JSON.parse(fdata)
				this._data = {}
				this._data.url   = json.url
				this._data.issue = new Issue({url: this._data.url, data: json.issue.issues})
				this._data.pull  = new Pulls({url: this._data.url, data: json.pull.pulls})
			} catch(e) {
				console.error(e.message)
			}
		}
		else if (props.type === 'url' && (typeof props.data === 'string' && props.data.trim() !== '')) {
			this._data = {}
			this._data.url   = props.data
			this._data.issue = new Issue({url: props.data})
			this._data.pull  = new Pulls({url: props.data})
		}
		else {
			let err = `Invalid argument specified, terminating...`
			throw err;
		}
	}
	
	set set_url(url) {
		if (typeof url === 'string' && url.trim() !== '')
			this._data.url = url
	}
	
	set dump(path) {
		if (!fs.existsSync(path.dir)){
			fs.mkdirSync(path.dir);
		}
		fs.writeFileSync((path.dir + path.file), JSON.stringify(this._data), 'utf8')
	}
	
	get get_url() {
		return this._data.url
	}
	
	getIssues(flag) {
		dns.resolve('8.8.8.8', 'A', (err) => {
			if (err && err.code === dns.NOTFOUND) {
				console.log(`Error: Connection not found. Displaying previous result...`)
				this._data.issue.view
			}
			else
				this._data.issue.fetch = flag
		})
	}
	
	getPulls(flag) {
		dns.resolve('8.8.8.8', 'A', (err) => {
			if (err && err.code === dns.NOTFOUND) {
				console.log(`Error: Connection not found. Displaying previous result...`)
				this._data.pull.view
			}
			else
				this._data.pull.fetch = flag
		})
	}
}

module.exports = GitHubT