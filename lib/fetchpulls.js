/*
 * GHB - GitHub on Terminal
 * Copyright (C) 2017 Progyan Bhattacharya <admin@codeprogyan.me>
 * Maintained by: Bytes Club (https://bytesclub.github.io)<bytes-club@googlegroups.com>
 * Distributed under MIT License.
 */

"use strict";

const https = require("https");

const fetchPulls = (config, flag, callback) => {
	const states = ["open", "closed", "all"];
	let fg = null;
	if (flag.key === "state" && typeof flag.value == "string" &&
		states.indexOf(flag.value) !== -1) {

		fg = "?state=" + flag.value;
	} else if (flag.key === "id" && typeof flag.value == "number") {
		fg = "/" + flag.value.toString();
	} else if (flag.key === "label" && typeof flag.value === "string") {
		let temp = flag.value.replace(/([,])[\s]/, ",");
		fg = "?labels=" + temp.replace(/[\s]/, "+");
	} else {
		let err = "Invalid argument specified for fetch pulls.";
		throw err;
	}
	const	pathUrl = config.url,
	        options = {
				hostname: "api.github.com",
				path: encodeURI(pathUrl + "/pulls" + fg),
				headers: {
					"Accepts": "application/json",
					"User-Agent": "Mozilla/5.0 (Windows NT 6.1) " +
						"AppleWebKit/537.36 (KHTML, like Gecko) " +
						"Chrome/57.0.2987.133 Safari/537.36"
			    }
	        };
	https.get(options, (res) => {
		if (res.statusCode !== 200){
			let err = "Error: Connection error occured. Please check your net connection and try later.";
			throw err;
		}
		let data = "";
		res.on("data", (chunk) => {
			data += chunk;
		});
		res.on("end", () => {
			try {
				let pulls = JSON.parse(data);
				if (typeof callback === "function")
					callback(pulls, config.path);
			} catch (e) {
				console.error(e.message);
			}
		});
	}).on("error", (err) => {
		throw err;
	});
}

module.exports = fetchPulls;
