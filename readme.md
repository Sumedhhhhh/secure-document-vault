# Secure Document Vault (Backend)

A secure backend service built with Node.js and Express that allows users to authenticate, upload documents, and securely access only their own files using JWT-based authorization.

This project focuses on backend fundamentals such as authentication, authorization, file handling, and secure API design.

---

## 🚀 Features

### Authentication & Security
- User registration with password hashing (bcrypt)
- User login with JWT-based authentication
- Protected routes using custom auth middleware
- Environment-based secret management using dotenv

### Document Vault
- Authenticated file uploads using Multer
- Owner-based access control (users can only access their own documents)
- Secure document downloads
- Metadata persistence using MongoDB
- Files stored on local disk (vault storage)

### Backend Architecture
- Clean Express project structure
- Separation of routes, controllers, middleware, and models
- MongoDB integration using Mongoose
- Defensive error handling and validation

---

## 🛠 Tech Stack

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **bcrypt**
- **Multer**
- **dotenv**

---

## 📂 Project Structure

secure-document-vault/
├── config/
│ └── db.js
├── controllers/
│ └── authController.js
├── middleware/
│ └── authMiddleware.js
├── models/
│ ├── User.js
│ └── Document.js
├── routes/
│ ├── auth.js
│ ├── health.js
│ └── documents.js
├── uploads/
├── index.js
├── .env
├── package.json
└── README.md