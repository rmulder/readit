import { gql } from 'apollo-server-express';

const defaultTypeDefs = gql`
  type Query {
    _empty: String!
  }
`;

const typeDefs = [defaultTypeDefs];

export default typeDefs;
