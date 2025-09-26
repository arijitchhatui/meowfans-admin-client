import { graphql } from '../generated';

export const DELETE_USER_MUTATION = graphql(`
  mutation DeleteUser {
    deleteUser
  }
`);

export const GET_USER_QUERY = graphql(`
  query GetUser($username: String!) {
    getUser(username: $username) {
      avatarUrl
      bannerUrl
      createdAt
      deletedAt
      firstName
      id
      lastLoginAt
      lastName
      roles
      updatedAt
      username
    }
  }
`);
