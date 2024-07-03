
# Table of contents
- [Run BOPS Platform locally](#run-bops-platform-locally)
  - [Environment variables](#environment-variables)


# Run BOPS Platform locally
1. Open two terminal windows or tabs.
1. In the first terminal:
   - Navigate to the `/platform` folder.
   - Run `npm install` to install dependencies.
   - Run `npm start` to start the application. 
   - Application will start in port 3000.
1. In the second terminal:
   - Navigate to the `/platform/MockJsonServer` folder.
   - Run `npm install` to install dependencies.
   - Run `npm start` to start the server.
   - Server will start in port 3001.

## Environment Variables
You need to create a .env in the platform directory with the variables.

* REACT_APP_BASE_API_ADDRESS -> this is the url of the backend mock server, by default the server starts at `http://localhost:3001`

```
REACT_APP_BASE_API_ADDRESS="http://localhost:3001"
```