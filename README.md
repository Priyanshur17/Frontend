# iNotebook Backend

This repository contains the code for backend of iNotebook app using MERN stack etc. The project contains Schema for storing data into databases, API endpoints, routes & all other parts which are required and necessary for building a backend of an application.

## Features

- Backend Database: The backend of iNotebook is linked with MongoDB Atlas to store & fetch data, fast and secure.
- Hashing: By means of hashing, your passwords are end-to-end encrypted and cannot be viewed, hacked or shared. 
- Authenticator - By the use of JSON Web Token, chances of phishing are minimized & user info is limited to that specific user only.
- API Calls: By using the API calls at the endpoints of Host URL, you can get or put your data from database.

## Tech used 🛠️

- [MongoDB Atlas](https://www.mongodb.com/atlas) - Database program
- [Node.Js](https://nodejs.org/en) - JavaScript runtime environment
- [Express.Js](http://expressjs.com/) - JavaScript Framework
- [JSON Web Token](https://jwt.io/) - Authenticator
- [Express Validator](https://express-validator.github.io) - Validator

## Availabe Endpoints
#### User Authentication:

- [HOST_URL/api/auth/createuser]() - To Create a new account (POST).
- [HOST_URL/api/auth/login]() - To login into account (POST).
- [HOST_URL/api/auth/getuser]() - To get data of logged in user (POST).

#### Notes:

- [HOST_URL/api/notes/fetchnotes]() - To fetch all notes of a user (GET).
- [HOST_URL/api/notes/updatenote/USER_ID]() - To update a note (PUT).
- [HOST_URL/api/notes/addnote]() - To add a note. (POST).
- [HOST_URL/api/notes/deletenote//USER_ID]() - To delete note (DEL).

## Getting Started 

To get started with Backend project, follow these steps:

1. Clone the repository:

2. Create a .env file in your project root directory

3. Initialize 3 env variables, named as:
- MONGODB_USERNAME - Your MongoDB Atlas username.
- MONGODB_PASSWORD - Your MongoDB Atlas password.
- JWT_SECRET_SIGN - Your custom JWT Secret Signature. (Use combination of both Upper & Lowercase alphabets, numbers & symbols).

4. Run this command in terminal:
```bash
nodemon index.js
```

5. Open [http://localhost:8000](http://localhost:8000) to view it in your browser.

## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## Contact

If you have any questions, suggestions, or feedback, you can reach out to the project maintainer:

