# User Authentication and Password Management - README

This document provides an overview of the code responsible for user authentication and password management. The code includes functions for user registration, login, password reset, and change password operations. It also integrates with Cloudinary for avatar uploads and Resend for sending emails.

## Features
- **User Registration**: Allows new users to register, with avatar upload to Cloudinary.
- **User Login**: Authenticates users and issues a JWT token.
- **Forgot Password**: Sends a reset link via email.
- **Change Password**: Changes the password using a token from the reset link.

## Technologies Used
- **Express.js**: The framework for the backend server.
- **Mongoose**: For database operations with MongoDB.
- **Cloudinary**: For storing user avatars in the cloud.
- **Resend**: For sending transactional emails.
- **bcrypt**: For hashing passwords.
- **jsonwebtoken**: For generating JWT tokens.
- **crypto**: For secure token generation and hashing.

## Code Overview
The following sections describe the various operations supported by the code.

### User Registration
- **Endpoint**: `exports.register`
- **Description**: Registers a new user, uploads an avatar to Cloudinary, and stores user details in MongoDB.
- **Validation**: Ensures required fields are provided and passwords match.
- **Error Handling**: Returns an error if user already exists, passwords don't match, or avatar upload fails.
- **Cloudinary Integration**: Uploads the avatar to Cloudinary and stores the public ID and URL in MongoDB.

### User Login
- **Endpoint**: `exports.login`
- **Description**: Authenticates a user with email and password, then generates a JWT token.
- **Validation**: Checks if the user exists and if the password matches.
- **Error Handling**: Returns an error if user not found or passwords don't match.
- **Email Notification**: Sends a confirmation email upon successful login.

### Forgot Password
- **Endpoint**: `exports.forgotpassword`
- **Description**: Generates a reset token and sends it to the user's email.
- **Validation**: Checks if the user exists.
- **Error Handling**: Returns an error if user not found or email sending fails.
- **Email Integration**: Uses Resend to send the reset link via email.

### Change Password
- **Endpoint**: `exports.changepassword`
- **Description**: Changes the user's password based on a reset token.
- **Validation**: Ensures the token is valid and not expired, and passwords match.
- **Error Handling**: Returns an error if the token is invalid, expired, or passwords don't match.

## How to Use
To integrate this code into your backend application, follow these steps:

1. **Set Up Environment Variables**:
   - `RESEND_SECRET`: Your Resend API secret key.
   - `CLOUD_NAME`, `API_KEY`, `API_SECRET`: Cloudinary credentials.
   - `JWT_SECRET`: Secret key for JWT tokens.

2. **Install Required Libraries**:
   Ensure all necessary dependencies are installed.
   ```bash
   npm install express mongoose cloudinary resend bcrypt jsonwebtoken crypto
   ```

3. **Implement Middleware**:
   - Include a middleware for error handling.
   - Set up CORS and other Express middleware as needed.

4. **Define Routes**:
   - Register these functions in your Express routes.
   - Ensure proper authentication and authorization where needed.

## Notes and Recommendations
- **Error Handling**: Ensure robust error handling for all user operations.
- **Security**: Apply best practices for security, such as hashing passwords and validating JWT tokens.
- **Email Configuration**: Configure Resend with the correct API key for sending emails.
- **Cloudinary Integration**: Ensure Cloudinary credentials are set up correctly for avatar uploads.

## Conclusion
This code provides user authentication and password management features for a full-stack web application. It supports user registration, login, password reset, and change password operations. The code integrates with Cloudinary for avatar uploads and Resend for sending emails. Ensure proper security and error handling when integrating this code into your application.