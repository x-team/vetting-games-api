import { Context } from "@context";
import { Resolvers } from "@gql";
import { GraphQLError } from "graphql";

export const missionSchema = `#graphql
  type Mission {
    id: Int!
    title: String!
    description: String!
    type: String!
    level: Int!
  }

  type Query {
    missions: [Mission!]!
    mission(id: Int!): Mission
    missionByTypeLevel(type: String!, level: Int!): Mission
  }
`;

export const missionResolver: Resolvers<Context> = {
  Query: {
    missions: async (_, __, { prisma, user }) => {
      if (!user)
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      return prisma.mission.findMany({ where: { active: true } });
    },
    mission: async (_, { id }, { prisma, user }) => {
      if (!user)
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      return prisma.mission.findUnique({
        where: { id },
      });
    },
    missionByTypeLevel: async (_, { type, level }, { prisma, user }) => {
      if (!user)
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      return prisma.mission.findUnique({
        where: { type_level: { type, level } },
      });
    },
  },
};
