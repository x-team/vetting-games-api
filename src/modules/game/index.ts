import { Context } from "@context";
import {
  GraphQLAlreadyStartedError,
  GraphQLNotFoundError,
  GraphQLUnauthorizedError,
} from "@error";
import { Resolvers } from "@gql";

export const gameSchema = `#graphql
  type Game {
    id: Int!
    score: Int
    startedAt: Date!
    finishedAt: Date

    mission: Mission
  }

  extend type Query {
    game: Game
  }

  extend type Mutation {
    startGame(missionId: Int!): Game!
  }
`;

export const gameResolver: Resolvers<Context> = {
  Game: {
    mission: async (game, _, { prisma }) => {
      const mission = await prisma.game
        .findUnique({
          where: {
            id: game.id,
          },
        })
        .mission();

      return mission;
    },
  },
  Query: {
    game: async (_, __, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();

      const game = await prisma.game.findFirst({
        where: {
          userId: user.id,
          finishedAt: null,
        },
      });

      return game;
    },
  },
  Mutation: {
    startGame: async (_, { missionId }, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();

      const mission = await prisma.mission.findUnique({
        where: { id: missionId },
      });

      if (!mission) throw new GraphQLNotFoundError("Mission not found");

      const existingGame = await prisma.game.findFirst({
        where: {
          userId: user.id,
          finishedAt: null,
        },
      });

      if (existingGame) throw new GraphQLAlreadyStartedError();

      const game = await prisma.game.create({
        data: {
          userId: user.id,
          missionId,
        },
      });

      return game;
    },
  },
};
