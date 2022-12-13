import { GraphQLError } from "graphql";

export class GraphQLAlreadyStartedError extends GraphQLError {
  constructor(message = "Game already started.") {
    super(message, {
      extensions: { code: "GAME_ALREADY_STARTED" },
    });
  }
}
