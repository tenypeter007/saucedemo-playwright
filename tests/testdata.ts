export const testData = {
  validUser: {
    username: 'testuser@example.com',
    password: 'ValidPass123!'
  },
  invalidUser: {
    username: 'invaliduser@example.com',
    password: 'ValidPass123!'
  },
  invalidPassword: {
    username: 'testuser@example.com',
    password: 'InvalidPass123!'
  },
  emptyUsername: {
    username: '',
    password: 'ValidPass123!'
  },
  emptyPassword: {
    username: 'testuser@example.com',
    password: ''
  },
  emptyBoth: {
    username: '',
    password: ''
  },
  passwordMaskingTest: {
    password: 'TestPassword123!'
  }
};

export const errorMessages = {
  invalidCredentials: 'Invalid username or password',
  usernameRequired: 'Username is required',
  passwordRequired: 'Password is required',
  bothFieldsRequired: 'Username and password are required'
};

export const urls = {
  login: '/login',
  dashboard: '/dashboard'
};