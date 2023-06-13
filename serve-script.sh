#!/bin/sh
sed -i "s/__REACT_APP_BACKEND_IP__/$REACT_APP_BACKEND_IP/g" /app/build/static/js/main.*.js
exec serve -s build
