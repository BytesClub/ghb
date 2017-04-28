'use strict';

const  fetchPulls = require('./fetchpulls.js'),
       viewPulls  = require('./viewpulls.js')

class Pull {
	constructor(props) {
		this._url = props.url
		this.pulls = typeof props.data === 'undefined' ? [] : props.data
	}
	
	set fetch(flag) {
		return fetchPulls({url: this._url}, flag, viewPulls)
	}
	
	get view() {
		return viewPulls(this.pulls)
	}
}

module.exports = Pull