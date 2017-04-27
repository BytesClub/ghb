'use strict';

const  fs     = require('fs'),
       dns    = require('dns'),
       Issue  = require('./issue.js'),
       Pulls  = require('./pulls.js')

class GitHubT {
	constructor(props) {
		if (props.type === 'json') {
			try {
				let json = fs.readFileSync(props.data, 'utf8')
				this._data = JSON.parse(json)
			} catch(e) {
				console.log(e.message)
			}
		}
		else if (props.type === 'url') {
			this._data = {}
			this._data.url   = props.data
			this._data.issue = new Issue({url: this._data.url})
			this._data.pull  = new Pulls({url: this._data.url})
		}
		else {
			let err = `Invalid argument specified, terminating...`
			throw err;
		}
			
	}
	
	set set_url(url) {
		if (typeof url === 'string' || url.trim().length() !== 0)
			this._data.url = url
	}
	
	set dump(path) {
		fs.writeFileSync(path, JSON.stringify(this._data), 'utf8')
	}
	
	get get_url() {
		return this._data.url
	}
	
	getIssues(flag) {
		dns.resolve('8.8.8.8', 'A', (err) => {
			if (err && err.code === dns.NOTFOUND)
				console.log(`Error: Connection not found. Displaying previous result...`)
			else
				this._data.issue.fetch(flag)
			return this._data.issue.view()
		})
	}
	
	getPulls(flag) {
		dns.resolve('8.8.8.8', 'A', (err) => {
			if (err && err.code === dns.NOTFOUND)
				console.log(`Error: Connection not found. Displaying previous result...`)
			else
				this._data.pull.fetch(flag)
			return this._data.pull.view()
		})
	}
}

module.exports = GitHubT