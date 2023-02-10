import { Context } from "@context";
import { GraphQLNotFoundError, GraphQLUnauthorizedError } from "@error";
import { Resolvers } from "@gql";
import fs from "fs";
import path from "path";

export const fileSchema = `#graphql
  type File {
    id: ID!
    name: String!
    content: String!
  }

  extend type Query {
    "Get all files for a game (including bugs)"
    gameFiles(gameId: ID!): [File!]!
  }
`;

export const fileResolver: Resolvers<Context> = {
  Query: {
    gameFiles: async (_, { gameId }, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();

      const game = await prisma.game.findUnique({
        where: {
          id: gameId,
        },
        include: {
          mission: {
            include: {
              missionFiles: {
                include: {
                  file: true,
                },
              },
            },
          },
          bugs: {
            include: {
              bug: {
                include: {
                  bugFiles: {
                    include: {
                      file: true,
                      bug: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!game) throw new GraphQLNotFoundError("Game not found");

      const files = game.mission.missionFiles.map(
        (missionFile) => missionFile.file
      );
      const bugsFiles = game.bugs.map((bug) => bug.bug.bugFiles).flat();

      const bugsFilesWithContent = bugsFiles.map((bugFile) => {
        const content = fs.readFileSync(
          path.join(__dirname, "./files", bugFile.file.path),
          "utf8"
        );
        return {
          ...bugFile,
          content,
        };
      });

      const filesWithContent = files.map((file) => {
        const content = fs.readFileSync(
          path.join(__dirname, "./files", file.path),
          "utf8"
        );

        const lines = content.split("\n");
        const bugFiles = bugsFilesWithContent.filter(
          (bugFile) => bugFile.bug.fileId === file.id
        );

        let contentWithBugs = "";
        for (let i = lines.length; i > 0; i--) {
          const line = lines[i - 1];
          const currentBugFile = bugFiles.find(
            (bugFile) => bugFile.lineStart <= i && bugFile.lineEnd >= i
          );

          contentWithBugs = currentBugFile
            ? currentBugFile.lineStart === i
              ? `${currentBugFile.content}\n${contentWithBugs}`
              : contentWithBugs
            : `${line}\n${contentWithBugs}`;
        }

        return {
          ...file,
          content: contentWithBugs,
        };
      });

      return filesWithContent;
    },
  },
};
