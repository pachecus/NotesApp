Write-Host "Insalling backend dependencies..."
cd backend
npm install

cd ..

Write-Host "Installing frontend dependencies..."
cd frontend
npm install

Write-Host "Inicializing backend server..."
cd ../backend
Start-Process "cmd" -ArgumentList "/c node server.js" -NoNewWindow

Write-Host "Inicializing frontend server..."
cd ../frontend
Start-Process "cmd" -ArgumentList "/c npm start" -NoNewWindow

Write-Host "Backend and Frontend inicializied correctly"
