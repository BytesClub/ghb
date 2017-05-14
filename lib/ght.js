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
       Pulls  = require('./pulls.js'),
       URL    = /https:\/\/(www.)?github.com\/[a-z0-9-]+\/[a-z0-9-]+/i

class GitHubT {
	constructor(props) {
		if (props.type === 'json') {
			try {
				let fPath = props.data.dir + '/' + props.data.file
				let fData = fs.readFileSync(fPath, 'utf8')
				let json = JSON.parse(fData)
				this._data = {}
				this._data.url   = json.url
				this._data.issue = new Issue({url: this._data.url, data: json.issue.issues, path: props.data})
				this._data.pull  = new Pulls({url: this._data.url, data: json.pull.pulls, path: props.data})
			} catch(e) {
				let err = `Invalid Error Occured: Make sure GitHub Terminal is initiated correctly.`
				throw err;
			}
		}
		else if (props.type === 'url' && (typeof props.data === 'string' && props.data.trim().length !== 0 && URL.test(props.data))) {
			this._data = {}
			this._data.url   = props.data
			this._data.issue = new Issue({url: props.data, path: props.path})
			this._data.pull  = new Pulls({url: props.data, path: props.path})
			try {
				if (!fs.existsSync(props.path.dir)) {
					fs.mkdirSync(props.path.dir)
				}
				let fPath = props.path.dir + '/' + props.path.file
				fs.writeFileSync(fPath, JSON.stringify(this._data), 'utf8')
			} catch(e) {
				let err = `Invalid Error Occured: Make sure GitHub Terminal has correct permissions.`
				throw err;
			}
		}
		else {
			let err = `Invalid argument specified. Make sure you put URL in following format:
				https://www.github.com/<User/Org>/<Repo>`
			throw err;
		}
	}

	get get_url() {
		if (typeof this._data === 'undefined' || typeof this._data.url === 'undefined') {
			let err = `GitHub Terminal has not been initiated in this repository.`
			throw err;
		}
		return this._data.url
	}

	getIssues(flag) {
		dns.resolve('8.8.8.8', 'A', (err) => {
			if (err && err.code === dns.NOTFOUND) {
				console.error(`Error: Connection not found. Displaying previous result...`)
				this._data.issue.view
			}
			else
				this._data.issue.fetch = flag
		})
	}

	getPulls(flag) {
		dns.resolve('8.8.8.8', 'A', (err) => {
			if (err && err.code === dns.NOTFOUND) {
				console.error(`Error: Connection not found. Displaying previous result...`)
				this._data.pull.view
			}
			else
				this._data.pull.fetch = flag
		})
	}
}

module.exports = GitHubT