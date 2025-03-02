# NoteApp

## Description
This project consists of a **Node.js backend** and a **React frontend**. The application requires several runtimes and tools to function correctly. Below are all the required software dependencies and their specific versions.

## Backend Requirements

The backend is built using **Node.js** and uses the **npm** package manager for dependency management.

### Required Environment:

- **Node.js**: v23.5.0 
- **npm**: v10.9.2

### Required Tools:

- **Sequelize**
  - **Version**: v6.31.0

## Frontend Requirements

The frontend is developed with **React.js** and also uses **npm** for managing dependencies.

### Required Environment:

- **Node.js**: v23.5.0
- **npm**: v10.9.2

The setup scripts will automatically handle the installation of frontend and backend dependencies and launch the frontend server.

### Steps to Install and Set Up the Backend and the Frontend:

1. There are two setup scripts in this folder:
   - `setupLinux.sh`: For Linux (not tested yet).
   - `setupWindows11.ps1`: For Windows 11 environments.

2. To set up everything, including starting the backend and frontend servers:
   - **For Windows**: Open a PowerShell terminal and execute the following command:
     ```powershell
     .\setupWindows11.ps1
     ```
     This will automatically install dependencies, create the database, and launch both the backend and frontend servers.

   - **For Linux**: If you are using Linux, you can try running the `setupLinux.sh` script. However, please note that I have not tested it, so it may require adjustments. You can execute the following command in your terminal:
     ```bash
     bash setupLinux.sh
     ```

   Once the script runs, the application will automatically be available in your browser at `http://localhost:3000`.



## Starting the Project

Once you run the appropriate setup script for your operating system, the backend and frontend servers will be automatically started. You can then open your browser and go to `http://localhost:3000` to view the application.

---

## Important Files

- **backend/server.js**: The main file for the backend server.
- **frontend/src/App.js**: The main component for the frontend.
- **frontend/package.json**: Contains all dependencies and scripts for the frontend.
- **backend/package.json**: Contains all dependencies and scripts for the backend.
