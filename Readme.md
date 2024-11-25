<!-- @format -->

Easygenerator Test Project

# How to run the application

Please create .env file in backend. I've pushed env smaple.

```
cd backend
yarn
yarn start
```

```
cd frontend
yarn
yarn dev
```

**Technical Stack Used**

- **Backend**: Node.js/Nest.js, MongoDB, TypeScript
- **Frontend**: React, TypeScript, TailwindCSS, ContextAPI

## Requirement

- Frontend

  - Sign Up Page
    - Create a signup form with the following fields: email, name, and password. After successful signup, users should be redirected to the application page.
    - Password Requirement
      - Minimum length of 8 characters
      - Contains at least 1 letter.
      - Contains at least 1 number.
      - Contains at least 1 special character.
  - Sign In Page
    - Create a sign-in form with fields for email and password.
  - Application(Dashboard) Page
    - Create a page displaying a welcome message: "Welcome to the application."

- Backend
  - Implement the back-end endpoints using the NestJS framework and integrate MongoDB as the database.

## Implemented Features

- Frontend
  - Created SignUp, SignIn, Dashboard Pages
- Backend
  - Implemented endpoints with NestJS.
  - Used JWT(Json Web Token) to secure the application.
  - Implemented logging.