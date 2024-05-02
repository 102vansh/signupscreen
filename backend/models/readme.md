# User Authentication Schema

This project involves a basic user authentication schema using Mongoose for MongoDB. The code snippet outlines a `User` schema for a MongoDB database. It defines various properties and methods related to user authentication, including email validation, password hashing, token generation, and password reset mechanisms.

## Features
- **User Attributes**: The schema defines basic user attributes such as `name`, `email`, `password`, `avatar`, `checkbox`, and others.
- **Password Hashing**: Passwords are hashed using `bcrypt` before saving to ensure security.
- **Email Validation**: The schema uses `validator` to ensure the provided email is valid.
- **JWT Token Generation**: The schema generates JWT tokens for user authentication.
- **Password Reset Token**: A token is generated for password reset functionality.
- **Timestamps**: The schema includes timestamps to track record creation and modification times.

## Technologies Used
- **Mongoose**: An ODM (Object-Document Mapping) library for MongoDB and Node.js.
- **Validator**: A library to validate user inputs like email.
- **Bcrypt**: A library to hash and compare passwords securely.
- **JSON Web Tokens (JWT)**: A standard for generating tokens for authentication.
- **Crypto**: A library used to create secure random values and hashes for token generation.

## User Schema Overview
### Schema Fields
- `name`: A string field representing the user's name.
- `email`: A required string field with validation to ensure it's a valid email.
- `password`: A required string field, hashed before saving.
- `confirmpassword`: A required string field, hashed before saving.
- `avatar`: An object with `public_id` and `url` to store avatar-related data.
- `checkbox`: A boolean field with a default value of `false`.
- `resetpasstoken`: A field for storing password reset tokens.
- `resetpassexpire`: A field for storing password reset token expiration times.
- `timestamps`: Automatically adds `createdAt` and `updatedAt` timestamps.

### Pre-Save Hooks
- The schema uses pre-save hooks to hash the `password` and `confirmpassword` using `bcrypt` before saving them to the database.

### Methods
- `comparepassword`: Compares a given password with the stored hashed password.
- `generatetoken`: Generates a JWT token for user authentication.
- `getgeneratetoken`: Generates a token for password reset, hashing it with `crypto`, and sets an expiration time.

## Usage
### Requirements
- Node.js
- MongoDB
- Environment variables for `JWT_SECRET`, `JWT_EXPIRE`, and any other relevant configuration.

### Setup
1. Install required packages:
   ```bash
   npm install mongoose validator bcrypt jwt jsonwebtoken crypto
   ```
2. Ensure MongoDB is running and connected to your application.
3. Set up environment variables for JWT and other configuration parameters.
4. Import the `User` model in your application and use it to interact with user data.

### Basic Operations
- **Create a User**:
  - Create a new user object and save it to the database. The password will be hashed automatically.
- **Authenticate a User**:
  - Use `comparepassword` to check if the provided password matches the stored password.
  - Use `generatetoken` to generate a JWT token for authenticated users.
- **Reset Password**:
  - Use `getgeneratetoken` to create a password reset token.
  - Send the token to the user via email or other means for password reset.

## Notes
- Ensure secure handling of JWT secrets and sensitive data.
- Properly validate all user inputs to prevent security vulnerabilities.
- Consider implementing additional security measures such as rate limiting, input sanitization, and monitoring for suspicious activities.