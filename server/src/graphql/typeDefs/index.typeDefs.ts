import { gql } from 'apollo-server-express';
import subTypeDefs from './sub.typeDefs';

const defaultTypeDefs = gql`
  type Query {
    _empty: String!
  }

  scalar DateTime
`;

const typeDefs = [defaultTypeDefs, subTypeDefs];

export default typeDefs;
