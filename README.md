# ghb

![ghb](Docs/ghb.png)

ghb is a command line tool to fetch and update GitHub Issue and Pull Request from terminal

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://raw.githubusercontent.com/BytesClub/ghb/master/LICENSE)
[![Build Status](https://travis-ci.org/BytesClub/ghb.svg?branch=master)](https://travis-ci.org/BytesClub/ghb)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/ghb)
[![Download](https://img.shields.io/npm/dt/ghb.svg)](https://www.npmjs.com/package/ghb)
[![Issues](https://img.shields.io/github/issues/BytesClub/ghb.svg)](https://github.com/BytesClub/ghb/issues)
[![Pull Request](https://img.shields.io/github/issues-pr/BytesClub/ghb.svg)](https://github.com/BytesClub/ghb/pulls)
[![Releases](https://img.shields.io/github/release/BytesClub/ghb.svg)](https://github.com/BytesClub/ghb/releases)
[![gitter](https://badges.gitter.im/gitterHQ/gitterHQ.github.io.svg)](https://gitter.im/Bytes_Club/General)

### Installation

* Using _**npm**_
```bash
$ npm install ghb -g
$ curl https://raw.githubusercontent.com/BytesClub/ghb/master/ghb-auto.sh > /etc/bash_completion.d/ghb
```

### Usage
* Configure _**ghb**_ with local repo
```bash
$ ghb init <github-url>
```
* Check status of _**ghb**_
```bash
$ ghb status
```
* Get latest issues/pr from GitHub
```bash
$ ghb issues [options: open | closed | all | id={ID}]
$ ghb pulls [options: open | closed | all | id={ID}]
```

### Contribute
* If you find any bug register an issue.
* If you want to make design improvement [comment here](https://github.com/BytesClub/ghb/issues/10).
* Look issues and try to solve them and create a pull request

**IMPORTANT** Every commit must follow the standard:
```
shortlog: commit message

commit body

fixes: #<issue_number>

Signed-Off-By: [Your name] <your email>
```

#### [Bytes Club](https://bytesclub.github.io)