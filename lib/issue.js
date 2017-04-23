'use strict';

const  fetchIssue = require('./fetchissue.js'),
       viewIssue  = require('./viewissue.js')

class Issue {
	constructor(url) {
		this.url = url
		this.issues = []
	}
	
	set fetch(flag) {
		return fetchIssue({"url": this.url}, this.issues, flag)
	}
	
	get view() {
		return viewIssue(this.issues)
	}
}