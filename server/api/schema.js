const { gql } = require("apollo-server-express");

module.exports = gql`
  # scalar Date

  type Item {
    id: ID!
    title: String!
    imageurl: String
    description: String!
    itemowner: User!
    created: String
    borrower: User
    tags: [Tag]
  }

  type User {
    id: ID!
    email: String!
    bio: String
    fullname: String!
    items: [Item]
    borrowed: [Item]
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input SignupInput {
    fullname: String!
    email: String!
    password: String!
  }

  type Tag {
    id: ID!
    title: String!
  }

  type AuthPayload {
    token: String!
    user: User
  }

  input AssignedTag {
    id: ID!
    title: String!
  }

  input AssignedBorrower {
    id: ID!
  }

  input NewItemInput {
    title: String!
    description: String
    tags: [AssignedTag]!
    imageurl: String
  }

  type Query {
    user(id: ID!): User
    item(id: ID!): Item
    viewer: User
    items(filter: ID): [Item]
    tags: [Tag]
  }

  type Mutation {
    signup(user: SignupInput): AuthPayload!
    login(user: LoginInput): AuthPayload!
    logout: Boolean!
    addItem(item: NewItemInput): Item
  }
`;
