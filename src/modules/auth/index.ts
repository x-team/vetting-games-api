import { Context } from "@context";
import { Resolvers } from "@gql";
import githubLogin from "@modules/github/githubLogin";
import githubUser from "@modules/github/githubUser";
import githubUserEmails from "@modules/github/githubUserEmails";
import signUserToken from "./signUserToken";

export const authSchema = `#graphql
  type TokenResponse {
    access_token: String!
  }

  extend type Mutation {
    loginWithGitHub(code: String!, redirectUrl: String): TokenResponse!
  }
`;

export const authResolver: Resolvers<Context> = {
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
