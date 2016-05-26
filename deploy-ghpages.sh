#!/bin/bash

# cd to the directory of this script
cd "$(dirname "$0")"

rm -rf dist/ tmp/
ember build -prod
cd pub-branch
git checkout master
rm -rf *
cp -R ../dist/* .
git add -A

# starts with the -m message than opens the editor
git commit -m "Deployed on `date`" -e
git push

# need to delete these afterwards or ember server fails
rm -rf dist/ tmp/
