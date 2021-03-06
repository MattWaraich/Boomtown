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
      email
      bio
    }
    created
    borrower {
      id
      fullname
      email
      bio
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

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($input: NewItemInput!) {
    addItem(item: $input) {
      title
      description
      imageurl
      tags {
        id
        title
      }
    }
  }
`;

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

export const SIGNUP_MUTATION = gql`
  mutation signup($user: SignupInput!) {
    signup(user: $user) {
      token
      user {
        id
        email
        fullname
        bio
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($user: LoginInput!) {
    login(user: $user) {
      token
      user {
        id
        email
        fullname
        bio
      }
    }
  }
`;
