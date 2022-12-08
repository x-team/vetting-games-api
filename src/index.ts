import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { context, Context } from "@context";
import { resolvers, typeDefs } from "@modules";
import { json } from "body-parser";
import cors from "cors";
import express from "express";

(async function main() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: [typeDefs],
    resolvers,
  });

  app.use("/health", (req, res) => res.send("OK"));
  app.use(cors({ origin: process.env.CLIENT_HOST || "*" }));
  app.use(json());

  await server.start();

  app.use("/graphql", expressMiddleware<Context>(server, { context }));

  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  });
})();
