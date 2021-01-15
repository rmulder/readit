import { gql } from 'apollo-server-express';

const subTypeDefs = gql`
  extend type Query {
    subs: [Sub!]!
    sub(name: String!): Sub
  }

  type Sub {
    id: String!
    name: String!
    title: String!
    image_urn: String!
    banner_urn: String
    description: String!
    created_at: DateTime!
    updated_at: DateTime!

    username: String!
  }
`;

export default subTypeDefs;
