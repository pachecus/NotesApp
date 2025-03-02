#!/bin/bash

# I developed this whole proyect using Windows 11, i created this script to test the application in Linux or Mac but im not sure that
# it will work since i could not test it.
echo "Insalling backend dependencies..."
cd backend
npm install

cd ..

echo "Installing frontend dependencies..."
cd frontend
npm install

echo "Inicializing backend server..."
cd ../backend
nohup node server.js &

echo "Inicializing frontend server..."
cd ../frontend
nohup npm start &

echo "Backend and Frontend inicializied correctly"
