import { GraphQLError } from "graphql";

export class GraphQLNotFoundError extends GraphQLError {
  constructor(message = "Resource not found.") {
    super(message, {
      extensions: { code: "NOT_FOUND" },
    });
  }
}
