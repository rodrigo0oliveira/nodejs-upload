# 📦 Upload Node.js Project

A Node.js application for handling file uploads using Express. Supports uploading files to a local directory and cloud storage in Cloudinary.

## 🚀 Features

- Upload files via API
- Store files locally and integrate with cloud storage
- Validation for file types and size (Only png formats can be uploaded)
- Jwt validation (Only admin users can upload a file)

## 📦 Installation and how to run

```bash
# Clone the repo
git clone https://github.com/rodrigo0oliveira/nodejs-upload.git

# Navigate to the project folder
cd nodejs-upload

# Install dependencies
npm install

# Create a .env based in .env.example

PORT=

(This you can create in https://www.mongodb.com/pt-br/products/platform/atlas-database)
MONGO_URL=

JWT_SECRET_KEY=

(This you can create in https://cloudinary.com/)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Run server
npm run server
