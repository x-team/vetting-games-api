import { TokenUser } from "@context";
import jwt from "jsonwebtoken";

export default function verifyUserToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "secret") as TokenUser;
  } catch (error) {
    console.error(error);
    return null;
  }
}
