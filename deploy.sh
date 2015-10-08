#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REMOTE_URL=`git config --get remote.origin.url`

function setup {
   cd $DIR/.tmp
   git init
   git remote add origin $REMOTE_URL
   git pull origin master
   git branch --set-upstream-to=origin/master master
}

mkdir -p .tmp
[ -d $DIR/.tmp/.git ] || setup
find .tmp -type f ! -path '*.git*' | xargs rm
cp -R resources/public/ .tmp/
cd .tmp/
git add -A
git commit -m "Site updated at $(date +%Y-%m-%dT%H:%M:%S)"
git push origin master
