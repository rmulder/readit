import { gql } from '@apollo/client';

export const GET_SUB = gql`
  query getSub($name: String!) {
    sub(name: $name) {
      name
      title
      description
      createdAt
      imageUrl
      bannerUrl
      username
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
  }
`;
