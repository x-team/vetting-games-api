import { Context } from "@context";
import { GraphQLUnauthorizedError } from "@error";
import { Resolvers } from "@gql";

export const scoreboardSchema = `#graphql
  type Scoreboard {
    id: ID!
    score: Int!

    user: User
    game: Game
    mission: Mission
  }

  input ScoreboardPaginationInput {
    take: Int!
    skip: Int!
  }

  extend type Query {
    "Get a scoreboard by mission id"
    scoreboard(missionId: Int!): Scoreboard
    "Get all scoreboards by mission id"
    scoreboards(missionId: Int!, pagination: ScoreboardPaginationInput): [Scoreboard!]!
    "Get the scoreboard position of the user"
    getScoreboardPosition(missionId: Int!): Int!
  }
`;

export const scoreboardResolver: Resolvers<Context> = {
  Scoreboard: {
    game: async (scoreboard, _, { prisma }) => {
      const game = await prisma.scoreboard
        .findUnique({
          where: {
            id: scoreboard.id,
          },
        })
        .game();

      return game;
    },
    mission: async (scoreboard, _, { prisma }) => {
      const mission = await prisma.scoreboard
        .findUnique({
          where: {
            id: scoreboard.id,
          },
        })
        .mission();

      return mission;
    },
    user: async (scoreboard, _, { prisma }) => {
      const user = await prisma.scoreboard
        .findUnique({
          where: {
            id: scoreboard.id,
          },
        })
        .user();

      return user;
    },
  },
  Query: {
    scoreboard: async (_, { missionId }, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();

      const scoreboard = await prisma.scoreboard.findUnique({
        where: {
          missionId_userId: {
            missionId,
            userId: user.id,
          },
        },
      });

      return scoreboard;
    },
    scoreboards: async (_, { missionId, pagination }, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();

      const scoreboard = await prisma.scoreboard.findMany({
        where: {
          missionId,
          active: true,
        },
        take: pagination?.take,
        skip: pagination?.skip,
        orderBy: {
          score: "asc",
        },
      });

      return scoreboard;
    },
    getScoreboardPosition: async (_, { missionId }, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();

      type PositionRow = {
        position: bigint;
      };

      const response = await prisma.$queryRaw<PositionRow[] | undefined>`
        SELECT position FROM (
          SELECT
            s."id",
            s."userId",
            ROW_NUMBER() OVER (ORDER BY s."score" ASC) AS position
          FROM "Scoreboard" AS s
          WHERE s."missionId" = ${missionId} AND s."active" = true
        ) AS sbm
        WHERE sbm."userId" = CAST(${user.id} AS uuid)
      `;

      if (!response || response.length === 0) return 0;

      const position = Number(response[0].position);
      return position;
    },
  },
};
