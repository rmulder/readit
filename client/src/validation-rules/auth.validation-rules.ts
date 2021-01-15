import { RegisterOptions } from 'react-hook-form';

const usernameOptions: RegisterOptions = {
  required: {
    value: true,
    message: 'username is required',
  },
};

const emailOptions: RegisterOptions = {
  required: {
    value: true,
    message: 'email is required',
  },
  pattern: {
    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'must be a valid email address',
  },
};

const passwordOptions: RegisterOptions = {
  required: {
    value: true,
    message: 'password is required',
  },
  minLength: {
    value: 6,
    message: 'password must be at least 6 characters',
  },
};

export { usernameOptions, emailOptions, passwordOptions };
