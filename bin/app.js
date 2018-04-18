#!/usr/bin/env node

/*
 * GHB - GitHub on Terminal
 * Copyright (C) 2017 Progyan Bhattacharya <admin@codeprogyan.me>
 * Maintained by: Bytes Club (https://bytesclub.github.io)<bytes-club@googlegroups.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

"use strict";

const  argv    = process.argv,
       curDir  = process.cwd(),
       fs      = require("fs"),
       path    = require("path"),
       GHT     = require("../lib/ght.js"),
       ver     = require("../package.json").version,

       DIR     = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
       CONFIG  = path.resolve(DIR, ".ghb"),
       FILE    = curDir.replace(/[|&:;$%@"<>()+,\/\\\s]+/g, "-"),

       helpStr =
`Usage: ghb [options] [parameter]
 init  : Initialize GHB in your repo
       Required parameter: [url]
 status: Show current state of GHB
 issues: Fetch and display issues
       Optional parameter: [open / closed / all / id={ID} / label={LABELS}]
 pulls : Fetch and display pull requests
       Optional parameter: [open / closed / all / id={ID} / label={LABELS}]`,
       infoStr =
`Invalid number of argumnet passed
ghb -h or ghb --help to see usage details.
ghb -v or ghb --version to check version of GHB.`

var ghb, index = 0

if ((index = argv.indexOf("-v")) !== -1 ||
    (argv.indexOf("--version")) !== -1) {

    console.log(`GHB v${ver} (C) 2017 Progyan Bhattacharya, ` +
        "Bytes Club");

} else if ((index = argv.indexOf("-h")) !== -1 ||
            (argv.indexOf("--help")) !== -1) {

    console.log(helpStr);

} else if ((index = argv.indexOf("init")) !== -1) {
	if (typeof argv[index + 1] === "string") {

        ghb = new GHT({
            data: argv[index + 1],
            path: {
                dir:  CONFIG,
                file: FILE
            },
            type: "url"}
        );
	} else {
		console.log(infoStr);
	}
} else if ((index = argv.indexOf("status")) !== -1) {

    ghb = new GHT({
        data: {
            dir:  CONFIG,
            file: FILE
        },
        type: "json"
    });

	if (typeof ghb === "undefined" ||
        (Object.keys(ghb).length === 0 &&
        ghb. constructor === Object)) {

        const err = "GitHub Terminal has not been initiated " +
            "in this repository.";
		throw err;
	} else {
		console.log("Repository: Github\nURL:", ghb.get_url);
	}
} else if ((index = argv.indexOf("issues")) !== -1) {

    ghb = new GHT({
        data: {
            dir:  CONFIG,
            file: FILE
        }, type: "json"
    });

    if (typeof ghb === "undefined" ||
        (Object.keys(ghb).length === 0 &&
        ghb. constructor === Object)) {

        const err = "GitHub Terminal has not been initiated " +
            "in this repository.";
		throw err;
	}
	if (typeof argv[index + 1] === "string") {
		var regM = argv[index + 1].match(/id=(\d+)/);
		var regL = argv[index + 1]
                    .match(/label=(([""])?([^""]+)([""])?)/);
		if (regM && regM.length !== 0) {
			let issueId = parseInt(regM[1]);
			ghb.getIssues({
                key:   "id",
                value: issueId
            });
		} else if(regL && regL.length !== 0) {
			let label = regL[3];
			ghb.getIssues({
                key:   "label",
                value: label
            });
		} else {
			let state = argv[index + 1];
			if (state !== "open" && state !== "closed" &&
                state !== "all"){

                console.log(helpStr);
				process.exit(0);
			}
			ghb.getIssues({
                key:  "state",
                value: state
            });
		}
	} else {
		ghb.getIssues({
            key: "state",
            value: "open"
        });
	}
} else if ((index = argv.indexOf("pulls")) !== -1) {

    ghb = new GHT({
        data: {
            dir:  CONFIG,
            file: FILE},
        type: "json"
    });

    if (typeof ghb === "undefined" ||
        (Object.keys(ghb).length === 0 &&
        ghb. constructor === Object)) {

        const err = "GitHub Terminal has not been initiated " +
            "in this repository."
		throw err;
	}
	if (typeof argv[index + 1] === "string") {
		var regM = argv[index + 1].match(/id=(\d+)/);
		var regL = argv[index + 1]
                    .match(/label=(([""])?([^""]+)([""])?)/);
		if (regM && regM.length !== 0) {
			let issueId = parseInt(regM[1]);
			ghb.getIssues({
                key:   "id",
                value: issueId
            });
		} else if(regL && regL.length !== 0) {
			let label = regL[3];
			ghb.getIssues({
                key:   "label",
                value: label
            });
		} else {
			let state = argv[index + 1]
			if (state !== "open" && state !== "closed" &&
                state !== "all"){

                console.log(helpStr);
				process.exit(0);
			}
			ghb.getPulls({
                key:   "state",
                value: state
            });
		}
	} else {
		ghb.getPulls({
            key:   "state",
            value: "open"
        });
	}
} else {
	console.log(infoStr);
}
