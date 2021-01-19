import { gql } from 'apollo-server-express';

const userTypeDefs = gql`
  extend type Mutation {
    register(registerInput: RegisterInput!): User!
    login(loginInput: LoginInput!): User!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type User {
    short_id: String!
    username: String!
    email: String!
  }
`;

export default userTypeDefs;
