Online Book Store

Online Book Store is a scalable and secure web application that allows users to browse, manage, and interact with a collection of books online. It includes authentication, CRUD operations, protected routes, and a clean user interface for both general users and admins. The application is deployed on Vercel for public access.

Table of Contents

- Problem Statement  
- Objectives and Key Learnings  
- Project Architecture  
- Technologies Used  
- Features and Functional Modules  
- Folder Structure  
- Future Scope  
- Conclusion  
- Live Demo  
- References  
- Team

Problem Statement

Users and organizations increasingly seek a centralized and user-friendly platform to browse, purchase, and manage their favorite books online. Existing online bookstores often lack real-time inventory updates or seamless user experiences. This system addresses these challenges by providing authenticated users with a secure, intuitive interface to explore a wide range of books, make purchases, and manage their orders effortlessly.

Objectives and Key Learnings

Objectives:  
- Build a secure and responsive book store platform  
- Enable user authentication, protected routing, and book management features  
- Handle file import, API security, and scalable data architecture

Key Learnings:  
- REST API development and integration  
- JWT-based authentication and route protection  
- Form handling, file upload, and data validation  
- Component-based frontend architecture  
- Client-server communication and deployment best practices

Project Architecture

React Frontend ←→ Axios ←→ Express API ←→ MongoDB  
          ⬆️           ⬇️  
   ProtectedRoute   Auth Middleware

React handles the frontend routing and UI interactions. Axios communicates with Express APIs for book and user data. The backend is secured using JWT-based authentication and connected to MongoDB for data storage. Deployment is done via Vercel.

Technologies Used

Frontend: React, Tailwind CSS, Axios, React Router DOM  
Backend: Node.js, Express.js, MongoDB, Mongoose  
Authentication & Utils: bcryptjs, jsonwebtoken, dotenv  
File Handling: multer (optional)  
Dev Tools: Postman, VS Code, Git, GitHub

Features and Functional Modules

Frontend

- /signup: User registration form  
- /signin: Login form with JWT token storage  
- /: Public book listing for all visitors  
- /dashboard: Protected route showing user's books  
- /books/create: Form to add a new book  
- /books/edit/:id: Edit book details by ID  
- /books/delete/:id: Delete confirmation  
- /books/:id: View book details  
- /books/import: Upload file to import multiple books

Backend

- POST /api/auth/register: Create a new user and return JWT  
- POST /api/auth/login: Authenticate and return JWT  
- GET /api/books: Retrieve all books (protected)  
- GET /api/books/:id: Retrieve a single book by ID (protected)  
- POST /api/books: Add a new book (protected)  
- PUT /api/books/:id: Update existing book (protected)  
- DELETE /api/books/:id: Delete book by ID (protected)  
- POST /api/books/import: Accept and process file import (protected)

Folder Structure

client/
├── public/
├── src/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── Spinner.jsx
│ ├── pages/
│ │ ├── SignUp.jsx
│ │ ├── SignIn.jsx
│ │ ├── Home.jsx
│ │ ├── Dashboard.jsx
│ │ ├── BookCreate.jsx
│ │ ├── BookEdit.jsx
│ │ ├── BookDetails.jsx
│ │ └── BookImport.jsx
│ ├── routes/
│ │ └── ProtectedRoute.jsx
│ ├── App.js
│ └── index.js

server/
├── controllers/
│ ├── authController.js
│ └── bookController.js
├── models/
│ ├── User.js
│ └── Book.js
├── routes/
│ ├── authRoutes.js
│ └── bookRoutes.js
├── middleware/
│ └── authMiddleware.js
├── uploads/ (optional)
├── .env
├── server.js
├── package.json


Future Scope

- Role-based access (admin and user)  
- Book image uploads and gallery  
- Ratings and review system  
- Email notifications for book updates  
- Pagination and advanced search filtering  
- Export data to Excel or PDF  
- Cloud deployment on Render, Netlify, or AWS

Conclusion

The Online Book Store project delivers a modern, full-featured book management platform with a secure authentication system and responsive UI. It includes real-time inventory interaction, route protection, and CRUD operations. Built using modular and scalable architecture, the platform is extendable with features like user roles, payments, reviews, and recommendations. The system showcases hands-on full-stack development with real-world utility and provides a solid foundation for an advanced digital bookstore.

Live Demo

https://book-store-ziyd.vercel.app/

 
