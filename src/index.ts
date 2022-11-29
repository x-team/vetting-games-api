import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Resolvers } from "@generated/graphql.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const typeDefs = `#graphql
  type Mission {
    id: Int!
    title: String!
    description: String!
    type: String!
    level: Int!
  }

  type Query {
    missions: [Mission!]!
  }
`;

type Context = {
  prisma: PrismaClient;
};

const resolvers: Resolvers<Context> = {
  Query: {
    missions: async (parent, args, context) => {
      return context.prisma.mission.findMany();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer<Context>(server, {
  listen: { port: 4000 },
  context: async () => ({ prisma }),
});

console.log(`🚀 Server ready at ${url}`);
