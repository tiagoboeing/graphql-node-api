import { makeExecutableSchema } from 'graphql-tools';

const users: any[] = [
  {
    id: 1,
    name: 'Jon',
    email: 'jon@nodejs.com'
  },
  {
    id: 2,
    name: 'Maries',
    email: 'marie@nodejs.com'
  }
];

const typeDefs = `
  "Usuários"
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    allUsers: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }
`;

const resolvers = {
  User: {
    id: (user: any) => user.id,
    name: (user: any) => user.name,
    email: (user: any) => user.email
  },
  Query: {
    allUsers: () => users
  },
  Mutation: {
    createUser: (_parent: any, args: any) => {
      const newUser = Object.assign({ id: users.length + 1 }, args);
      users.push(newUser);
      return newUser;
    }
  }
};

export default makeExecutableSchema({ typeDefs, resolvers });
