import { gql } from 'apollo-server-express';
import subTypeDefs from './sub.typeDefs';

const defaultTypeDefs = gql`
  scalar DateTime
  
  type Query {
    _empty: String!
  }
`;

const typeDefs = [defaultTypeDefs, subTypeDefs];

export default typeDefs;
