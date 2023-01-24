import type { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import verifyUserToken from "@modules/auth/verifyUserToken";
import { prisma } from "@prisma";
import { PrismaClient, User } from "@prisma/client";

export type TokenUser = Pick<User, "id" | "email" | "name">;

export type Context = {
  prisma: PrismaClient;
  user?: TokenUser | null;
};

export const context: ContextFunction<
  [ExpressContextFunctionArgument],
  Context
> = async ({ req }) => {
  const accessToken = req.headers.authorization?.replace("Bearer ", "");

  try {
    const userToken = accessToken ? verifyUserToken(accessToken) : null;
    const user = userToken
      ? await prisma.user.findUnique({ where: { id: userToken?.id } })
      : null;

    if (!user?.active) return { prisma };

    return { prisma, user };
  } catch (error) {
    return { prisma };
  }
};
