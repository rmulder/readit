import { gql } from 'apollo-server-express';
import subTypeDefs from './sub.typeDefs';
import userTypeDefs from './user.typeDefs';

const defaultTypeDefs = gql`
  type Query {
    _empty: String!
  }

  type Mutation {
    _empty: String!
  }

  scalar DateTime
`;

const typeDefs = [defaultTypeDefs, userTypeDefs, subTypeDefs];

export default typeDefs;
