import { Context } from "@context";
import {
  GraphQLAlreadyStartedError,
  GraphQLNotFoundError,
  GraphQLUnauthorizedError,
} from "@error";
import { Resolvers } from "@gql";
import calculateGameScore from "./calculateScore";

export const gameSchema = `#graphql
  type BugOnGame {
    bugId: Int!
    gameId: ID!
  }

  type Game {
    id: ID!
    # Value between 0 and 1
    score: Decimal
    startedAt: Date!
    finishedAt: Date

    mission: Mission
    bugs: [BugOnGame!]
  }

  extend type Query {
    game(id: ID): Game
  }

  extend type Mutation {
    startGame(missionId: Int!): Game!
    selectBug(gameId: ID!, bugId: Int!): Game!
    unselectBug(gameId: ID!, bugId: Int!): Game!
    finishGame(id: ID!): Game!
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
    bugs: async (game, _, { prisma }) => {
      const bugs = await prisma.game
        .findUnique({
          where: {
            id: game.id,
          },
        })
        .bugs();

      return bugs;
    },
  },
  Query: {
    game: async (_, { id }, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();

      if (!id) {
        const game = await prisma.game.findFirst({
          where: {
            userId: user.id,
            finishedAt: null,
          },
        });

        return game;
      }

      const game = await prisma.game.findUnique({
        where: { id },
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
        select: {
          id: true,
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
    selectBug: async (_, { gameId, bugId }, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();

      const game = await prisma.bugOnGame
        .create({
          data: {
            bugId,
            gameId,
          },
        })
        .game();

      return game;
    },
    unselectBug: async (_, { gameId, bugId }, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();

      const game = await prisma.bugOnGame
        .delete({
          where: {
            gameId_bugId: {
              gameId,
              bugId,
            },
          },
        })
        .game();

      return game;
    },
    finishGame: async (_, { id }, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();

      const existingGame = await prisma.game.findUnique({
        where: { id },
        select: {
          id: true,
          startedAt: true,
          userId: true,
          bugs: {
            select: {
              bugId: true,
            },
          },
          missionId: true,
          mission: {
            select: {
              bugs: {
                select: {
                  id: true,
                  realBug: true,
                },
              },
            },
          },
        },
      });

      if (!existingGame) throw new GraphQLNotFoundError("Game not found");

      const score = calculateGameScore(existingGame);
      const time = Math.floor(
        (new Date().getTime() - existingGame.startedAt.getTime()) / 1000
      );

      const game = await prisma.game.update({
        where: { id: existingGame.id },
        data: { finishedAt: new Date(), score },
      });

      if (game.score?.toNumber() === 1) {
        await prisma.scoreboard.upsert({
          create: {
            score: time,
            gameId: existingGame.id,
            missionId: existingGame.missionId,
            userId: existingGame.userId,
          },
          update: {
            score: time,
          },
          where: {
            missionId_userId: {
              missionId: existingGame.missionId,
              userId: existingGame.userId,
            },
          },
        });
      }

      return game;
    },
  },
};
