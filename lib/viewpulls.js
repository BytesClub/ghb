/*
 * GHB - GitHub on Terminal
 * Copyright (C) 2017 Progyan Bhattacharya <admin@codeprogyan.me>
 * Maintained by: Bytes Club (https://bytesclub.github.io)<bytes-club@googlegroups.com>
 * Distributed under MIT License.
 */

"use strict";

const fs = require("fs"),
      dsp = require("./display.js");

const viewPulls = (pulls, path) => {
	if (typeof pulls === "undefined" || pulls.length === 0) {
		console.error("No Pull Request to show!");
		return false;
	}
	if (! Array.isArray(pulls)) {
		dsp(pulls);
	} else {
		pulls.forEach(dsp);
	}
	try {
		if (! fs.existsSync(path.dir)) {
			fs.mkdirSync(path.dir);
		}
		let fPath = path.dir + "/" + path.file;
		let fData = fs.readFileSync(fPath, "utf8");
		let json  = JSON.parse(fData);
		json.pull.pulls = pulls;
		fs.writeFileSync(fPath, JSON.stringify(json), "utf8");
	} catch(e) {
		let err = "Invalid Error Occured: Make sure GitHub Terminal has " +
            "correct permissions."
		throw err;
	}
	return true;
}

module.exports = viewPulls;
