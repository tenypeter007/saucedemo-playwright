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
  bothEmpty: {
    username: '',
    password: ''
  },
  passwordTest: {
    password: 'TestPassword123'
  },
  rememberMeUser: {
    username: 'testuser@example.com',
    password: 'ValidPass123!'
  }
};