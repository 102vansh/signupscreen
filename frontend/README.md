# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



# React Frontend with User Authentication and News Display

This project is a frontend application built with React and Redux for state management. It implements user authentication, password reset, and news content display, along with routing and UI styling. The codebase uses Tailwind CSS for styling and React Hot Toast for notifications.

## Features
- **User Authentication**: Allows users to register, log in, and reset their passwords.
- **State Management**: Utilizes Redux to manage user state across components.
- **Routing**: Uses React Router for navigation between components.
- **Pagination**: Includes React Paginate for paginated news content.
- **File Upload**: Supports file upload for user avatars.
- **Toasts/Notifications**: Uses `react-hot-toast` for user feedback and notifications.

## Technologies Used
- **React**: The core framework for building user interfaces.
- **Redux**: A state management library for React.
- **React Router**: A library for managing routes in React applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: A promise-based HTTP client for interacting with APIs.
- **React Hot Toast**: A library for displaying toast notifications.
- **React Paginate**: A library for implementing pagination in React.

## Project Structure
- **App Component**: Defines the main application structure and routing.
- **Components**: Individual components for various features (e.g., Register, Login, Home, Forgot, Newpass).
- **Redux Store**: Defines the Redux store and user slice for state management.
- **Styling**: Uses Tailwind CSS for component styling.
- **File Upload**: Supports avatar uploads during user registration.

## Components Overview
### App Component
- **Routing**: Sets up routes for different components using `BrowserRouter`, `Routes`, and `Route`.
- **Conditional Rendering**: Displays the `Home` component if a user is logged in; otherwise, it displays the `Login` component.
- **Redux Selector**: Uses `useSelector` to access Redux state.

### Register Component
- **State Management**: Uses React's `useState` to manage form inputs.
- **File Upload**: Supports avatar uploads with `FileReader`.
- **Form Submission**: Submits registration data to the backend using Axios.
- **Validation**: Validates password matching and a checkbox for bot prevention.
- **Navigation**: Uses `useNavigate` to redirect after successful registration.

### Login Component
- **Form Submission**: Sends login credentials to the backend.
- **Redux Dispatch**: Updates Redux state with the logged-in user.
- **Navigation**: Redirects to `Home` on successful login.
- **Error Handling**: Uses `react-hot-toast` to display errors or success messages.

### Forgot Component
- **Form Submission**: Sends a request to reset a password.
- **Navigation**: Redirects to `Login` after sending the reset link.

### Newpass Component
- **Password Reset**: Resets the user's password using a token.
- **Validation**: Checks for password matching before submission.

### Home Component
- **News Display**: Fetches and displays news articles with pagination.
- **Pagination**: Uses React Paginate for paginated news content.
- **Navigation**: Redirects to `Login` if the user is not logged in.

## Redux Store
- **User Slice**: A Redux slice for managing user state.
- **Store Configuration**: Configures Redux store with the user slice.

## Usage Instructions
1. **Clone the Repository**:
   Clone this repository to your local environment.
   ```bash
   git clone https://github.com/102vansh/signupscreen.git
   cd /frontend
   ```

2. **Install Dependencies**:
   Install all required Node.js packages.
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   Start the React development server.
   ```bash
   npm run dev
   ```

4. **Navigate in the Application**:
   Open your browser and navigate to `http://localhost:5173/`.
   - **Register**: Create a new account.
   - **Login**: Log in with an existing account.
   - **Home**: View news content with pagination.
   - **Forgot Password**: Request a password reset.
   - **Reset Password**: Reset your password with a token.

5. **Testing**:
   Test the application with various user scenarios (registration, login, password reset) to ensure proper functionality.

## Notes and Recommendations
- **Backend Setup**: Ensure the backend server is running and endpoints are configured correctly.
- **Error Handling**: Implement proper error handling and security measures for production use.
- **UI Improvements**: Tailwind CSS allows rapid prototyping, but consider custom styling for production-ready designs.

## Conclusion
This React frontend provides user authentication and news display with Redux for state management and React Router for routing. It serves as a solid foundation for building a complete web application, with features like user registration, login, password reset, and news content with pagination.