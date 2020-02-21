#!/bin/bash

echo "Building..."
tsc

cd extension

uglifyjs --compress -- main.js

echo "Zipping..."

zip -r upload.zip .
cd ..

echo "Complete!"
