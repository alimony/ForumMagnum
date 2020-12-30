#!/bin/bash
# Check presence and versions of outside-of-node dependencies, including the
# version of node itself. In the future this may be a postinstall script
# run from package.json.

echo -n "Checking for node... "
if which node >/dev/null; then
  node --version 2>&1
  NODE_MAJOR_VERSION=$(node -p 'process.version.match(/^v(\d+)/)[1]')
  if [ "$NODE_MAJOR_VERSION" -lt 14 ]; then
    echo "Your version of nodejs is too old (we require 14+)."
    exit 1
  fi
else
  echo "not found"
  echo "Install node.js 14 or later to continue. https://nodejs.org/"
  exit 1
fi

echo -n "Checking for yarn... "
if which yarn >/dev/null; then
  yarn --version
else
  echo not found
  echo "Install yarn.js to continue. https://yarnpkg.com/getting-started/install"
  exit 1
fi

echo -n "Checking for mongodb... "
if which mongod >/dev/null; then
  mongod --version |head -1
else
  echo "not found"
  echo '`mongod` is not installed. You can run LessWrong by connecting to a remote'
  echo 'database, but you probably want a local server for testing.'
  echo "See https://docs.mongodb.com/manual/installation/"
  echo
fi

echo -n "Checking for curl... "
if which curl >/dev/null; then
  echo "yes"
else
  echo "no"
  echo "You do not have curl installed. The server will still run, but some associated"
  echo "scripts and unit tests will fail."
  echo
fi

if [ ! -f settings.json ]; then
  echo "Creating settings.json"
  cp sample_settings.json settings.json
fi

if [ ! -f settings-dev.json ]; then
  echo "Creating settings-dev.json"
  cp sample_settings.json settings-dev.json
fi
