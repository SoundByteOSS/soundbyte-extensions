#!/bin/bash

echo "Building..."
tsc

echo "Zipping..."
cd extension
zip -r upload.zip .
cd ..

echo "Complete!"
