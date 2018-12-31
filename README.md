# Build a blog using Nest.js, TypeScript, React and MongoDB

Application repo for a simple blog application built with Nest.js, TypeScript, React and MongoDB.

## Getting Started
This prototype is divided into two separate sections. Namely the Backend ( Built with Nest.js) and the frontend
( Built with React ).

Install TypeScript globally on your machine if you don't have it installed already:

```bash
npm install -g typescript
```

### Clone the repository
To easily set up the application, clone this repository which contains directory for both sections of the project ( i.e `blog-backend` and `blog-frontend`)

```bash
git clone https://github.com/yemiwebby/nest-react-project.git
```

## Change directory into the newly cloned project
```bash
cd nest-react-project
```

## Backend
### Change directory into the backend
```bash
cd blog-backend
```

### Install backend dependencies

```bash
npm install
```
Once the installation process is complete, navigate to `./src/common/authentication.middleware.ts` and replace the `YOUR_DOMAIN` placeholder with the credential that I will share with you.

### MongoDB
Ensure that you have mongoDB installed on your machine before running the application. I have this fully setup on my mac already.

Start mongoDB:

```bash
sudo mongod
```

### Run the application
Open another terminal and still within the `blog-backend` project directory run the application with:

```bash
npm run start:dev
```

This will start the backend application on port `5000`. This was modified to avoid confliction with the frontend application which by default will run on port `3000`


## Frontend
Open another terminal from the `nest-react-project` and navigate to the `blog-frontend` folder to setup the frontend

### Frontend dependencies
```bash
cd blog-frontend
npm install
```

### Run the frontend app

```bash
npm start
```

### Include Auth0 App credentials

Navigate to `./src/utils/auth.tsx` file and replace the `YOUR_CLIENT_ID` and `YOUR_DOMAIN` placeholder with the appropriate credentials. You can find the placeholders within the `constructor()` and `logout()` method.

### Test the application
Finally open your browser and view the application on http://localhost:3000

## Prerequisites
 [Node.js](https://nodejs.org/en/), [Yarn package manager](https://yarnpkg.com/lang/en/docs/install/#mac-stable), [MongoDB](https://docs.mongodb.com/v3.2/installation/) and [TypeScript](https://www.typescriptlang.org/)


## Built With
[Nest.js]()
[React.js]()
[Auth0]() 
[TypeScript]()
[MongoDB]() 