#!/bin/bash

# Additional Installation script for GHB.
#
# GHB - GitHub on Terminal
# Copyright (C) 2017 Progyan Bhattacharya <admin@codeprogyan.me>
# Maintained by: Bytes Club (https://bytesclub.github.io)<bytes-club@googlegroups.com>
# Distributed under MIT License.

sudo bash -c 'ghb-auto.sh > /etc/bash_completion.d/ghb'
source /etc/bash_completion.d/ghb

# sudo bash -c 'ghb completion > /etc/bash_completion.d/ghb'
# source /etc/bash_completion.d/ghb
