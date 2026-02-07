export const testData = {
  users: {
    validUser: {
      username: 'testuser@example.com',
      password: 'ValidPass123!'
    },
    invalidUser: {
      username: 'invaliduser@example.com',
      password: 'ValidPass123!'
    },
    validUserInvalidPassword: {
      username: 'testuser@example.com',
      password: 'WrongPassword123!'
    },
    emptyUsername: {
      username: '',
      password: 'ValidPass123!'
    },
    emptyPassword: {
      username: 'testuser@example.com',
      password: ''
    },
    emptyFields: {
      username: '',
      password: ''
    }
  },
  passwords: {
    testPassword: 'TestPassword123!'
  },
  urls: {
    loginPage: '/login',
    dashboardPage: '/dashboard'
  },
  validationMessages: {
    invalidCredentials: 'Invalid credentials',
    requiredUsername: 'Username is required',
    requiredPassword: 'Password is required',
    loginError: 'Login failed'
  }
};