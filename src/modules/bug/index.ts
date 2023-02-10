import { Context } from "@context";
import { Resolvers } from "@gql";

export const bugSchema = `#graphql
  type BugType {
    id: Int!
    name: String!
    description: String!
  }
`;

export const bugResolver: Resolvers<Context> = {};
