const userTypes = `
  # User definition type
  type User {
    id: ID!
    name: String!
    email: String!
    photo: String
    createdAt: String!
    updatedAt: String!
    posts(first: Int, offset: Int): [ Post! ]!
  }

  # Create a user account
  input UserCreateInput {
    name: String!
    email: String!
    password: String!
  }

  # Update account
  input UserUpdateInput {
    name: String!
    email: String!
    photo: String!
  }

  # Change password
  input UserUpdatePasswordInput {
    password: String!
  }
`;

const userQueries = `
  # List users with pagination
  users(first: Int, offset: Int): [User!]!

  # Search user by ID
  user(id: ID!): User
`;

const userMutations = `
  createUser(input: UserCreateInput!): User
  updateUser(id: ID!, input: UserUpdateInput!): User
  updateUserPassword(id: ID!, input: UserUpdatePasswordInput!): Boolean
  deleteUser(id: ID!): Boolean
`;

export { userTypes, userQueries, userMutations };
