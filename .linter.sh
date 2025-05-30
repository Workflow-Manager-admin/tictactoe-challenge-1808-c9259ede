#!/bin/bash
cd /tmp/kavia/workspace/code-generation/tictactoe-challenge-1808-c9259ede/tic_tac_toe_container
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

