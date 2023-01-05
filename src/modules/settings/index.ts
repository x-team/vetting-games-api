import { Context } from "@context";
import { GraphQLNotFoundError, GraphQLUnauthorizedError } from "@error";
import { Resolvers } from "@gql";

export const settingsSchema = `#graphql
  type GameSettings {
    showTutorial: Boolean!
  }

  type Settings {
    id: ID!
    gameSettings: GameSettings
  }

  input GameSettingsInput {
    showTutorial: Boolean!
  }

  input SettingsInput {
    gameSettings: GameSettingsInput
  }

  extend type Mutation {
    updateSettings(settings: SettingsInput!): Settings!
  }
`;

export const settingsResolver: Resolvers<Context> = {
  Settings: {
    gameSettings: async (settings, _, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();

      const gameSettings = await prisma.settings
        .findUnique({
          where: {
            id: settings.id,
          },
        })
        .gameSettings();

      return gameSettings;
    },
  },
  Mutation: {
    updateSettings: async (_, { settings }, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();

      const updatedSettings = await prisma.settings.upsert({
        where: {
          id: user.id,
        },
        update: {
          gameSettings: settings.gameSettings
            ? {
                upsert: {
                  create: settings.gameSettings,
                  update: settings.gameSettings,
                },
              }
            : undefined,
        },
        create: {
          id: user.id,
          gameSettings: settings.gameSettings
            ? {
                create: settings.gameSettings,
              }
            : undefined,
        },
        include: {
          gameSettings: true,
        },
      });

      return updatedSettings;
    },
  },
};
