import { Context } from "@context";
import { Resolvers } from "@gql";
import { Decimal } from "@prisma/client/runtime";
import { GraphQLScalarType } from "graphql";

export const decimalSchema = `#graphql
  scalar Decimal
`;

export const decimalResolver: Resolvers<Context> = {
  Decimal: new GraphQLScalarType<Decimal | null, number | null>({
    name: "Decimal",
    description: "Decimal",
    serialize: (value) => (value ? (value as Decimal).toNumber() : null),
    parseValue: (value) => (value ? new Decimal(Number(value)) : null),
    parseLiteral: (ast) => {
      if (ast.kind === "IntValue") return new Decimal(parseInt(ast.value, 10));
      return null;
    },
  }),
};
