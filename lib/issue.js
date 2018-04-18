/*
 * GHB - GitHub on Terminal
 * Copyright (C) 2017 Progyan Bhattacharya <admin@codeprogyan.me>
 * Maintained by: Bytes Club (https://bytesclub.github.io)<bytes-club@googlegroups.com>
 * Distributed under MIT License.
 */

"use strict";

const  fetchIssue = require("./fetchissue.js"),
       viewIssue  = require("./viewissue.js");

class Issue {
	constructor(props) {
		this._url   = props.url
                        .replace(/https:\/\/(www.)?github.com/, "/repos");
		this._path  = props.path;
		this.issues = typeof props.data === "undefined" ? [] : props.data;
	}

	set fetch(flag) {
		return fetchIssue({
            url:  this._url,
            path: this._path
        }, flag, viewIssue);
	}

	get view() {
		return viewIssue(this.issues, this._path);
	}
}

module.exports = Issue;
