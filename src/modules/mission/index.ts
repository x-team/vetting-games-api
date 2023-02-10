import { Context } from "@context";
import { GraphQLUnauthorizedError } from "@error";
import { Resolvers } from "@gql";

export const missionSchema = `#graphql
  type Mission {
    id: Int!
    title: String!
    description: String!
    type: String!
    level: Int!
    releaseDate: Date

    bugTypes: [BugType!]
  }

  type Query {
    # Get all missions
    missions: [Mission!]!
    # Get a mission by id
    mission(id: Int!): Mission
    # Get a mission by type and level
    missionByTypeLevel(type: String!, level: Int!): Mission
    # Get all missions by type
    missionsByType(type: String!): [Mission!]!
  }
`;

export const missionResolver: Resolvers<Context> = {
  Mission: {
    bugTypes: async ({ id }, _, { prisma }) => {
      return prisma.mission.findUnique({ where: { id } }).bugTypes();
    },
  },
  Query: {
    missions: async (_, __, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();
      return prisma.mission.findMany({ where: { active: true } });
    },
    mission: async (_, { id }, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();
      return prisma.mission.findUnique({
        where: { id },
      });
    },
    missionByTypeLevel: async (_, { type, level }, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();
      return prisma.mission.findUnique({
        where: { type_level: { type, level } },
      });
    },
    missionsByType: async (_, { type }, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();
      return prisma.mission.findMany({
        where: { type },
      });
    },
  },
};
