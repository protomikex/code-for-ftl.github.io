#!/bin/bash

echo 'removing existing gh-pages branch...'
git branch -D gh-pages

echo 'creating gh-pages branch...'
git checkout --orphan gh-pages

echo 'compiling latest...'
harp compile

echo 'removing unnecessary files...'
find . -maxdepth 1 ! -name 'www' ! -name '.*' | xargs rm -rf

echo 'moving build files to root...'
rm -rf www/www; mv www/* .

echo 'commiting build...'
git add -A; git commit -m "latest build"

