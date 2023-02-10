import { GraphQLError } from "graphql";

/** Error thrown when a game has already started. */
export class GraphQLAlreadyStartedError extends GraphQLError {
  constructor(message = "Game already started.") {
    super(message, {
      extensions: { code: "GAME_ALREADY_STARTED" },
    });
  }
}
