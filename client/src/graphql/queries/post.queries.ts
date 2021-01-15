import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      title
      body
      createdAt
      url
      subName
      username
      voteCount
      userVote
      commentCount
    }
  }
`;
