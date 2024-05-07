# Error Handling Middleware

This project provides a custom error handling mechanism for a Node.js application. It includes an `ErrorHandler` class to represent application-specific errors and an `errormiddleware` function to handle these errors during request-response cycles.

## Features
- **Custom Error Class**: The `ErrorHandler` class extends the base `Error` class, allowing custom error messages and status codes.
- **Error Middleware**: A middleware function that catches errors and sends structured responses with appropriate status codes and messages.
- **Handling Common Errors**: The middleware provides specific handling for common errors like "CastError".

## Technologies Used
- **Node.js**: The backend JavaScript runtime.
- **Express.js**: A popular Node.js framework for building web applications and APIs.

## ErrorHandler Class
The `ErrorHandler` class is a custom error class that extends the built-in `Error` class. It allows you to specify a custom error message and an HTTP status code.

### Constructor Parameters
- `message`: A custom error message.
- `statuscode`: An HTTP status code representing the error (e.g., 404 for "Not Found").

### Example
```javascript
const { ErrorHandler } = require('./errorHandler');

throw new ErrorHandler('Resource not found', 404);
```

## Error Middleware
The `errormiddleware` function is a middleware for handling errors in an Express.js application. It captures errors, formats the response, and sends an appropriate status code and message.

### Function Parameters
- `err`: The error object.
- `req`: The Express request object.
- `res`: The Express response object.
- `next`: The next middleware function in the chain.

### Features
- **Default Error Handling**: If the error message or status code is not defined, it defaults to "Internal Server Error" and status code 500.
- **Specific Error Handling**: For "CastError" (e.g., invalid ObjectId in MongoDB), it creates a custom error message indicating resource not found.

### Response Structure
The middleware sends a JSON response with the following properties:
- `success`: Always `false` to indicate an error.
- `message`: The error message, either custom or default.

### Example
Here's how you would use the error middleware in an Express application:

```javascript
const express = require('express');
const { ErrorHandler, errormiddleware } = require('./errorHandler');

const app = express();

// Your routes here

// Use the error middleware at the end of your middleware chain
app.use(errormiddleware);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Usage
To use this error handling setup in your Express application, follow these steps:

1. **Import the ErrorHandler Class**:
   Import the `ErrorHandler` class to create custom errors.

2. **Implement Routes**:
   Define your application routes. In case of an error, throw an instance of `ErrorHandler`.

3. **Use the Error Middleware**:
   Add the `errormiddleware` function at the end of your middleware chain to catch and handle errors.

4. **Run the Application**:
   Start your Express server and test the error handling by triggering various error scenarios.

## Conclusion
This error handling setup provides a robust and flexible way to manage errors in a Node.js/Express application. By using a custom error class and middleware, you can ensure consistent error responses and easily extend the error handling logic for specific cases.