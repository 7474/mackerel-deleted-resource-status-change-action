#!/bin/sh

# git checkout -b releases/v0
# git commit -a -m "prod dependencies"

git merge origin/master
npm prune --production
git add node_modules -f
git commit -a -m "prod dependencies"
git push origin releases/v0

git push origin :refs/tags/v0
git tag -fa v0 -m "Update v0 tag"
git push origin v0
