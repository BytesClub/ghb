# bash/zsh completion support for GHB.
#
# GHB - GitHub on Terminal
# Copyright (C) 2017 Progyan Bhattacharya <admin@codeprogyan.me>
# Maintained by: Bytes Club (https://bytesclub.github.io)
# Distributed under MIT License.

_ghb() 
{
    local cur prev opts
    COMPREPLY=()
    cur="${COMP_WORDS[COMP_CWORD]}"
    prev="${COMP_WORDS[COMP_CWORD-1]}"
    opts="-h --help -v --version init status issues pulls"

    if [[ ${cur} == * ]] ; then
        COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
        return 0
    fi
}
complete -F _ghb ghb