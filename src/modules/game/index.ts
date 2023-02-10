import { Context } from "@context";
import {
  GraphQLAlreadyStartedError,
  GraphQLNotFoundError,
  GraphQLUnauthorizedError,
} from "@error";
import { Resolvers } from "@gql";
import { Bug, BugFile } from "@prisma/client";
import calculateGameScore from "./calculateScore";

export const gameSchema = `#graphql
  type GameBug {
    gameId: ID!
    bugTypeId: Int!

    game: Game
    bugType: BugType
  }

  type Game {
    id: ID!
    "Score value between 0 and 1"
    score: Decimal
    startedAt: Date!
    finishedAt: Date

    mission: Mission
    pickedBugs: [GameBug!]
  }

  extend type Query {
    "Get a game by id"
    game(id: ID): Game
  }

  extend type Mutation {
    "Player starts a game"
    startGame(missionId: Int!): Game!
    "Player selects a bug type for a game"
    selectBug(gameId: ID!, bugTypeId: Int!): Game!
    "Player unselects a bug type for a game"
    unselectBug(gameId: ID!, bugTypeId: Int!): Game!
    "Player finishes a game"
    finishGame(id: ID!): Game!
  }
`;

export const gameResolver: Resolvers<Context> = {
  GameBug: {
    game: async ({ gameId, bugTypeId }, _, { prisma }) => {
      const game = await prisma.gameBug
        .findUnique({
          where: {
            gameId_bugTypeId: {
              gameId,
              bugTypeId,
            },
          },
        })
        .game();

      return game;
    },
    bugType: async ({ gameId, bugTypeId }, _, { prisma }) => {
      const bugType = await prisma.gameBug
        .findUnique({
          where: {
            gameId_bugTypeId: {
              gameId,
              bugTypeId,
            },
          },
        })
        .bugType();

      return bugType;
    },
  },
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
    pickedBugs: async (game, _, { prisma }) => {
      const bugs = await prisma.game
        .findUnique({
          where: {
            id: game.id,
          },
        })
        .pickedBugs();

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
        include: {
          bugs: {
            include: {
              bugFiles: true,
            },
          },
        },
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

      const gameBugs: (Bug & { bugFiles: BugFile[] })[] = [];
      const maxBug = Math.random() < 0.5 ? 1 : 2;

      do {
        const randomIndex = Math.floor(Math.random() * mission.bugs.length);
        const bug = mission.bugs[randomIndex];

        const alreadyExistBugType = gameBugs.some(
          (gameBug) => gameBug.bugTypeId === bug.bugTypeId
        );
        const overrideLines = gameBugs.some((gameBug) =>
          gameBug.bugFiles.some(({ lineStart: ls1, lineEnd: le1 }) =>
            bug.bugFiles.some(
              ({ lineStart: ls2, lineEnd: le2 }) =>
                (ls1 >= ls2 && ls1 <= le2) || // ls1 is between ls2 and le2
                (le1 >= ls2 && le1 <= le2) || // le1 is between ls2 and le2
                (ls2 >= ls1 && ls2 <= le1) || // ls2 is between ls1 and le1
                (le2 >= ls1 && le2 <= le1) // le2 is between ls1 and le1
            )
          )
        );

        if (!alreadyExistBugType && !overrideLines) {
          gameBugs.push(bug);
        }
      } while (gameBugs.length < maxBug);

      const game = await prisma.game.create({
        data: {
          userId: user.id,
          missionId,
          bugs: {
            create: gameBugs.map((bug) => ({
              bugTypeId: bug.bugTypeId,
              bugId: bug.id,
            })),
          },
        },
      });

      return game;
    },
    selectBug: async (_, { gameId, bugTypeId }, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();

      const game = await prisma.pickedBug
        .create({
          data: {
            bugTypeId,
            gameId,
          },
        })
        .game();

      return game;
    },
    unselectBug: async (_, { gameId, bugTypeId }, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();

      const game = await prisma.pickedBug
        .delete({
          where: {
            gameId_bugTypeId: {
              gameId,
              bugTypeId,
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
          missionId: true,
          bugs: {
            select: {
              bugTypeId: true,
            },
          },
          pickedBugs: {
            select: {
              bugTypeId: true,
            },
          },
        },
      });

      if (!existingGame) throw new GraphQLNotFoundError("Game not found");

      const score = calculateGameScore(
        existingGame.bugs.map((bug) => bug.bugTypeId),
        existingGame.pickedBugs.map((bug) => bug.bugTypeId)
      );
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
