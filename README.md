# ght
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://raw.githubusercontent.com/BytesClub/ght/master/LICENSE)
[![Build Status](https://travis-ci.org/BytesClub/ght.svg?branch=master)](https://travis-ci.org/BytesClub/ght)
[![Issues](https://img.shields.io/github/issues/BytesClub/ght.svg)](https://github.com/BytesClub/ght/issues)
[![Pull Request](https://img.shields.io/github/issues-pr/BytesClub/ght.svg)](https://github.com/BytesClub/ght/pulls)
[![Releases](https://img.shields.io/github/release/BytesClub/ght.svg)](https://github.com/BytesClub/ght/releases)
[![gitter](https://badges.gitter.im/gitterHQ/gitterHQ.github.io.svg)](https://gitter.im/Bytes_Club/General)

ght is a command line tool to fetch and update GitHub Issue and Pull Request from terminal

### Usage
* Configure _**ght**_ with local repo
```bash
$ ght set-url <github-url>
```
* Fetch latest issues/pr from GitHub
```bash
$ ght fetch issue
$ ght fetch pulls
```
* View last state of issues/pr
```bash
$ ght view issue
$ ght view pulls
```