'use strict';

const  fetchPulls = require('./fetchpulls.js'),
       viewPulls  = require('./viewpulls.js')

class Pull {
	constructor(props) {
		this._url = props.url
		this.pulls = []
	}
	
	set fetch(flag) {
		return fetchPulls({url: this._url}, this.pulls, flag)
	}
	
	get view() {
		return viewPulls(this.pulls)
	}
}

module.exports = Pull