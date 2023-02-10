import { Context } from "@context";
import { GraphQLUnauthorizedError } from "@error";
import { Resolvers } from "@gql";
import githubLogin from "@modules/github/githubLogin";
import githubUser from "@modules/github/githubUser";
import githubUserEmails from "@modules/github/githubUserEmails";
import signUserToken from "./signUserToken";

export const authSchema = `#graphql
  type User {
    id: ID!
    name: String
    alias: String
    image: String

    games(missionId: Int): [Game!]
    scoreboards(missionId: Int): [Scoreboard!]
    settings: Settings
  }

  "Response from GitHub login"
  type TokenResponse {
    access_token: String!
  }

  extend type Query {
    "Get the current user"
    me: User!
  }

  extend type Mutation {
    """
    Login with GitHub

    Requires the code from the GitHub OAuth flow and the redirect URL
    """
    loginWithGitHub(code: String!, redirectUrl: String): TokenResponse!
  }
`;

export const authResolver: Resolvers<Context> = {
  User: {
    games: async (queryUser, { missionId }, { prisma, user }) => {
      if (queryUser.id !== user?.id) throw new GraphQLUnauthorizedError();

      const games = await prisma.user
        .findUnique({
          where: {
            id: user.id,
          },
        })
        .games({
          where: {
            missionId: missionId ? missionId : undefined,
          },
        });

      return games;
    },
    scoreboards: async (queryUser, { missionId }, { prisma, user }) => {
      if (queryUser.id !== user?.id) throw new GraphQLUnauthorizedError();

      const scoreboards = await prisma.user
        .findUnique({
          where: {
            id: user.id,
          },
        })
        .scoreboards({
          where: {
            missionId: missionId ? missionId : undefined,
          },
        });

      return scoreboards;
    },
    settings: async (queryUser, _, { prisma, user }) => {
      if (queryUser.id !== user?.id) throw new GraphQLUnauthorizedError();

      let settings = await prisma.settings.findUnique({
        where: {
          id: user.id,
        },
        include: {
          gameSettings: true,
        },
      });

      if (!settings) {
        settings = await prisma.settings.create({
          data: {
            id: user.id,
            gameSettings: {
              create: {
                showTutorial: true,
              },
            },
          },
          include: {
            gameSettings: true,
          },
        });
      }

      return settings;
    },
  },
  Query: {
    me: async (_, __, { prisma, user }) => {
      if (!user) throw new GraphQLUnauthorizedError();

      const me = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!me) throw new GraphQLUnauthorizedError();

      return me;
    },
  },
  Mutation: {
    loginWithGitHub: async (_parent, { code, redirectUrl }, { prisma }) => {
      const githubLoginRes = await githubLogin(
        code,
        redirectUrl ? redirectUrl : undefined
      );
      const githubUserData = await githubUser(githubLoginRes.access_token);
      const githubEmailsData = await githubUserEmails(
        githubLoginRes.access_token
      );
      const socialId = `gh_${githubUserData.id}`;
      const email = githubEmailsData.sort((a, b) => {
        const aValue =
          Number(a.primary) +
          Number(a.verified) +
          Number(a.visibility === "public");
        const bValue =
          Number(b.primary) +
          Number(b.verified) +
          Number(b.visibility === "public");

        return bValue > aValue ? 1 : -1;
      })[0].email;

      const user = await prisma.socialLogin
        .upsert({
          where: { id: socialId },
          create: {
            id: socialId,
            social: "GITHUB",
            user: {
              create: {
                name: githubUserData.name,
                email: email,
                image: githubUserData.avatar_url,
                alias: githubUserData.login,
              },
            },
          },
          update: {
            user: {
              update: {
                name: githubUserData.name,
                email: email,
                image: githubUserData.avatar_url,
                alias: githubUserData.login,
              },
            },
          },
        })
        .user();

      const token = signUserToken(user);

      return {
        access_token: token,
      };
    },
  },
};
