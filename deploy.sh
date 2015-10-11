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

mkdir -p .tmp/css/compiled .tmp/js/compiled
[ -d $DIR/.tmp/.git ] || setup
find .tmp -type f ! -path '*.git*' | xargs rm
cp resources/public/js/compiled/*.js .tmp/js/compiled/
cp resources/public/js/*.js .tmp/js/
cp resources/public/css/compiled/*.css .tmp/css/compiled/
cp resources/public/css/*.css .tmp/css/
cp resources/public/index.html .tmp/
cd .tmp/
git add -A
git commit -m "Site updated at $(date +%Y-%m-%dT%H:%M:%S)"
git push origin master
