Developer Snippet Vault – Full Stack Web Application

Developer Snippet Vault is a full-stack MERN web application 
that allows developers to securely store, organize, 
and manage reusable code snippets in one place. 
It helps developers quickly access frequently used code without 
searching through files or the internet.

Features

* User Registration & Login 
* Secure Password Hashing
* Create, Read, Update, and Delete (CRUD) Code Snippets
* Search Snippets by Title
* Filter Snippets by Programming Language
* Mark Snippets as Favorites
* Copy Code to Clipboard
* Responsive Dashboard
* User Profile Page
* Protected Routes
* Modern and Responsive UI

Tech Stack
Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Icons

Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

Project Structure

Developer-Snippet-Vault/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── README.md

Key Functionalities

* Secure user authentication using JWT.
* Store reusable code snippets with details such as title, language, category, description, and code.
* Search and filter snippets for quick access.
* Manage favorite snippets.
* Responsive interface for desktop and mobile devices.

Installation
Clone the Repository

git clone https://github.com/your-username/developer-snippet-vault.git
Install Dependencies

Backend

cd server
npm install

Frontend

cd client
npm install

Configure Environment Variables

Create a .env file inside the server folder.

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run the Backend
npm run dev

Run the Frontend
cd client
npm run dev

Future Enhancements

* Syntax Highlighting
* Dark Mode
* Tags and Categories
* Export Snippets
* Import Snippets
* Rich Code Editor
* Pagination
* Sorting Options

Author

Keerthika M

MCA Graduate | MERN Stack Developer

GitHub: https://github.com/keerthi-890

