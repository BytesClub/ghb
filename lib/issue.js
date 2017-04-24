'use strict';

const  fetchIssue = require('./fetchissue.js'),
       viewIssue  = require('./viewissue.js')

class Issue {
	constructor(props) {
		this._url = props.url
		this.issues = []
	}
	
	set fetch(flag) {
		return fetchIssue({url: this._url}, this.issues, flag)
	}
	
	get view() {
		return viewIssue(this.issues)
	}
}

module.exports = Issue