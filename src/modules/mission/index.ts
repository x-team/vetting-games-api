import { Context } from "@context";
import { GraphQLUnauthorizedError } from "@error";
import { Resolvers } from "@gql";

export const missionSchema = `#graphql
  type MissionSourceCode {
    id: String!
    src: String!
  }

  type Bug {
    id: Int!
    name: String!
    description: String!
  }

  type Mission {
    id: Int!
    title: String!
    description: String!
    type: String!
    level: Int!
    releaseDate: Date

    bugs: [Bug!]
    sourceCode: [MissionSourceCode!]
  }

  type Query {
    missions: [Mission!]!
    mission(id: Int!): Mission
    missionByTypeLevel(type: String!, level: Int!): Mission
    missionsByType(type: String!): [Mission!]!
  }
`;

export const missionResolver: Resolvers<Context> = {
  Mission: {
    sourceCode: async (mission, _, { prisma }) => {
      const sourceCode = await prisma.mission
        .findUnique({
          where: {
            id: mission.id,
          },
        })
        .sourceCode();

      return sourceCode;
    },
    bugs: async (mission, _, { prisma }) => {
      const bugs = await prisma.mission
        .findUnique({
          where: {
            id: mission.id,
          },
        })
        .bugs();

      return bugs;
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
