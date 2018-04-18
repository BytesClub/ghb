/*
 * GHB - GitHub on Terminal
 * Copyright (C) 2017 Progyan Bhattacharya <admin@codeprogyan.me>
 * Maintained by: Bytes Club (https://bytesclub.github.io)<bytes-club@googlegroups.com>
 * Distributed under MIT License.
 */

"use strict";

const regeXHead = /((#+)(([ ]\w+)+)([\s]))/ig,  // ### Something
      regeXBold = /((\*\*)([^(**)(__)]+)(\*\*))/ig,  // **Something**
      regeXImp  = /((__)([^(**)(__)]+)(__))/ig,  // __Something__
      regeXItal = /((\*)|(_))([^\s*_]+)((\*)|(_))/ig,  // *Something* or
                                                       // _Something_
      regexCode = /((```)([^`]+)(```))/ig,  // ```Something```
      regexPre  = /((`)([^`]+)(`))/ig;  // `Something`

const markDown = (str) => {
	if (typeof str !== "string" || str.trim().length === 0)
		return "/No description provided./";
	let nStr = str;
	nStr = nStr.replace(regeXHead, "\x1b[1m$3\x1b[22m");
	nStr = nStr.replace(regeXBold, "\x1b[1m$3\x1b[22m");
	nStr = nStr.replace(regeXImp, "\x1b[1m$3\x1b[22m");
	return nStr;
}

module.exports = markDown
