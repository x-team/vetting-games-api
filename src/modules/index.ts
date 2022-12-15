import { Context } from "@context";
import { Resolvers } from "@gql";
import { missionResolver, missionSchema } from "./mission";
import { authResolver, authSchema } from "./auth";
import { gameResolver, gameSchema } from "./game";
import { dateResolver, dateSchema } from "./date";
import { decimalResolver, decimalSchema } from "./decimal";

const baseSchema = `#graphql
  type Query {
    health: String!
  }

  type Mutation {
    health: String!
  }
`;

const baseResolver: Resolvers<Context> = {
  Query: {
    health: async (_parent, _args, { user }) => {
      if (!user) return "Hello, world!";
      return user ? `Hello, ${user.name}!` : "Hello, world!";
    },
  },
  Mutation: {
    health: async (_parent, _args, { user }) => {
      if (!user) return "Hello, world!";
      return user ? `Hello, ${user.name}!` : "Hello, world!";
    },
  },
};

export const typeDefs = [
  baseSchema,
  dateSchema,
  decimalSchema,
  authSchema,
  missionSchema,
  gameSchema,
];
export const resolvers = [
  baseResolver,
  dateResolver,
  decimalResolver,
  authResolver,
  missionResolver,
  gameResolver,
];
