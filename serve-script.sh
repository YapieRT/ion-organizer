#!/bin/sh
npm run build
npm install -g serve
exec serve -s build
