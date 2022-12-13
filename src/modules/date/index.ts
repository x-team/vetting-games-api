import { Context } from "@context";
import { Resolvers } from "@gql";
import { GraphQLScalarType } from "graphql";

export const dateSchema = `#graphql
  scalar Date
`;

export const dateResolver: Resolvers<Context> = {
  Date: new GraphQLScalarType<Date | null, number | null>({
    name: "Date",
    description: "Date time",
    serialize: (value) => (value ? (value as Date).getTime() : null),
    parseValue: (value) => (value ? new Date(Number(value)) : null),
    parseLiteral: (ast) => {
      if (ast.kind === "IntValue") return new Date(parseInt(ast.value, 10));
      return null;
    },
  }),
};
