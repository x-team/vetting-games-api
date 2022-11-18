import { TokenUser } from "@context";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export default function signUserToken(user: User) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    } as TokenUser,
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: process.env.JWT_EXPIRATION || "7d",
    }
  );
}
