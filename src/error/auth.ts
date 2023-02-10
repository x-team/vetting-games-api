import { GraphQLError } from "graphql";

/** Error thrown when a user does not have permission to perform an action. */
export class GraphQLForbiddenError extends GraphQLError {
  constructor(message = "You do not have permission to perform this action.") {
    super(message, {
      extensions: { code: "FORBIDDEN" },
    });
  }
}

/** Error thrown when a user is not logged in. */
export class GraphQLUnauthorizedError extends GraphQLError {
  constructor(message = "You must be logged in to perform this action.") {
    super(message, {
      extensions: { code: "UNAUTHORIZED" },
    });
  }
}
