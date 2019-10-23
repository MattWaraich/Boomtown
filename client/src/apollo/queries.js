//COPY AND PASTE ALL QUERIES FROM PLAYGROUND HERE -> JUST IMPORT THE ONES YOU NEED

import gql from "graphql-tag";

const ItemFields = gql`
  fragment ItemFields on Item {
    id
    title
    imageurl
    description
    itemowner {
      id
      fullname
    }
    created
    borrower {
      fullname
    }
    tags {
      id
      title
    }
  }
`;

export const ITEM_QUERY = gql`
  query item($id: ID!) {
    items {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_ITEMS_QUERY = gql`
  query items($filter: ID) {
    items(filter: $filter) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_USER_ITEMS_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      email
      bio
      fullname
      items {
        ...ItemFields
      }
      borrowed {
        ...ItemFields
      }
    }
  }
  ${ItemFields}
`;

export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      id
      title
    }
  }
`;

// # @TODO: Pass the item and image into the addItem mutation as arguments
//     # and return the new item id when the mutation is complete.
export const ADD_ITEM_MUTATION = gql`
  mutation addItem(
    $title: String!
    $description: String!
    $tags: [AssignedTag]!
  ) {
    addItem(item: { title: $title, description: $description, tags: $tags }) {
      title
      description
      tags {
        id
        title
      }
    }
  }
`;

/**
 * Auth-related queries and mutations.
 */

export const VIEWER_QUERY = gql`
  query {
    viewer {
      id
      email
      fullname
      bio
    }
  }
`;
export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

// Pass the user into the signup mutation as an argument
// and return the token and user id.
export const SIGNUP_MUTATION = gql`
  mutation signup($user: SignUpInput!) {
    signup(user: $user) {
      token
      user
    }
  }
`;

// Pass the user into the login mutation as an argument
// and return the token and user id.
export const LOGIN_MUTATION = gql`
  mutation login($user: LoginInput!) {
    login(user: $user) {
      token
      user
    }
  }
`;
