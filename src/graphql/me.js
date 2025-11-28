import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query Me {
    me {
      id
      auth0Sub
      username
      email
      isActive
      role
      createdAt
      lastLoginAt
    }
  }
`;
