import { GraphQLError } from "graphql";

/** Error thrown when a resource is not found. */
export class GraphQLNotFoundError extends GraphQLError {
  constructor(message = "Resource not found.") {
    super(message, {
      extensions: { code: "NOT_FOUND" },
    });
  }
}
