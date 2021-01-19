import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      short_id
      username
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      short_id
      username
      email
    }
  }
`;
