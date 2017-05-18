# ghb

![ghb](Docs/ghb.png)

ghb is a command line tool to fetch and update GitHub Issue and Pull Request from terminal

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://raw.githubusercontent.com/BytesClub/ghb/master/LICENSE)
[![Build Status](https://travis-ci.org/BytesClub/ghb.svg?branch=master)](https://travis-ci.org/BytesClub/ghb)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/ghb)
[![Bower](https://img.shields.io/bower/v/ghb.svg)](https://bower.io/search/?q=ghb)
[![Download](https://img.shields.io/npm/dt/ghb.svg)](https://www.npmjs.com/package/ghb)
[![Issues](https://img.shields.io/github/issues/BytesClub/ghb.svg)](https://github.com/BytesClub/ghb/issues)
[![Pull Request](https://img.shields.io/github/issues-pr/BytesClub/ghb.svg)](https://github.com/BytesClub/ghb/pulls)
[![Releases](https://img.shields.io/github/release/BytesClub/ghb.svg)](https://github.com/BytesClub/ghb/releases)
[![gitter](https://badges.gitter.im/gitterHQ/gitterHQ.github.io.svg)](https://gitter.im/Bytes_Club/General)

### Installation

* Using _**npm**_
```bash
$ npm install ghb -g
```

* Using _**bower**_
```bash
$ bower install ghb
```
_**Note:** Bower will install the package as dependency_

* Autocompletion Script
```bash
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
$ ghb issues [options: open | closed | all | id={ID} | label={LABELS}]
$ ghb pulls  [options: open | closed | all | id={ID} | label={LABELS}]
```

### What's new _(v1.3.6)_
* The source code and binary files, and the data storage has been split in different directories.
* No longer need to re-setup _**ghb**_ in directories, in case of upgrading the package.

### What's new _(v1.3.4)_
* Added markdown support for Terminal
* Improved UI quality
* User can search open issues via label(s)
* Label color resembles that on GitHub
![screen](Docs/Screenshotv1.3.png)

### Contribute
* If you find any bug or to request new feature register an issue.
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