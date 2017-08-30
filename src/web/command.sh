#!/bin/bash

set -e
set -x

npm run migrate
npm run build
npm start
