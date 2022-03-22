#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build:docs

# navigate into the build output directory
cd docs

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'docs: 🎉 deploy'

git push -f git@github.com:xyxiao001/vue-cropper.git master:gh-pages
