export const testData = {
  validUser: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  invalidUser: {
    username: 'invalid_user',
    password: 'secret_sauce'
  },
  invalidPassword: {
    username: 'standard_user',
    password: 'wrong_password'
  },
  emptyUsername: {
    username: '',
    password: 'secret_sauce'
  },
  emptyPassword: {
    username: 'standard_user',
    password: ''
  },
  bothEmpty: {
    username: '',
    password: ''
  },
  passwordTest: {
    password: 'secret_sauce'
  },
  rememberMeUser: {
    username: 'standard_user',
    password: 'secret_sauce'
  }
};