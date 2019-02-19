#!/bin/bash
# 这是一个在jenkins上的测试
echo "start sh"
node test.js
DEST_REV=$(git rev-parse --verify HEAD)
echo DEST_REV
echo "end sh"
