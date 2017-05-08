/*
 * GHB - GitHub on Terminal
 * Copyright (C) 2017 Progyan Bhattacharya <admin@codeprogyan.me>
 * Maintained by: Bytes Club (https://bytesclub.github.io)<bytes-club@googlegroups.com>
 * Distributed under MIT License.
 */

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