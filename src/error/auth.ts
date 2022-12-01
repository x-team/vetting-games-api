import { GraphQLError } from "graphql";

export class GraphQLForbiddenError extends GraphQLError {
  constructor(message = "You do not have permission to perform this action.") {
    super(message, {
      extensions: { code: "FORBIDDEN" },
    });
  }
}

export class GraphQLUnauthorizedError extends GraphQLError {
  constructor(message = "You must be logged in to perform this action.") {
    super(message, {
      extensions: { code: "UNAUTHORIZED" },
    });
  }
}
