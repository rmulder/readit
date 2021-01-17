import { gql } from 'apollo-server-express';

const subTypeDefs = gql`
  extend type Query {
    subs: [Sub!]!
    sub(name: String!): Sub
    subWithPosts(name: String!): SubWithPosts
  }

  type Sub {
    short_id: String!
    name: String!
    title: String!
    description: String!
    image_urn: String!
    banner_urn: String
    created_at: DateTime!

    username: String!
  }

  type Post {
    short_id: String!
    title: String!
    slug: String!
    body: String
    created_at: DateTime!

    username: String!
    sub_name: String!
  }

  type SubWithPosts {
    short_id: String!
    name: String!
    title: String!
    description: String!
    image_urn: String!
    banner_urn: String
    created_at: DateTime!

    username: String!

    posts: [Post!]!
  }
`;

export default subTypeDefs;
