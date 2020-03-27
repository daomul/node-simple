#!/bin/sh
cd /Users/zerozheng/Documents/work/demo/blog-simple/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log