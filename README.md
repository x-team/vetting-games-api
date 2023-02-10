# Vetting Games API

API for Vetting Games.

Check out the API on Staging: [https://vetting-games-api-staging.x-team.com/graphql](https://vetting-games-api-staging.x-team.com/graphql)

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/en/) (v18.12.0)
- [NVM - Node Version Manager](https://github.com/nvm-sh/nvm) (optional)
- [Docker](https://www.docker.com/)
- [Yarn](https://yarnpkg.com/)
- [Postgres DB](https://www.postgresql.org/)

### Environment Variables

You'll need some environment variables to get started. You can find a list of them in the `.env.example` file. You can copy this file to `.env` and fill in the values.

#### Database

You can get a local instance of Postgres running using Docker. The docker-compose file is configured run a Postgres instance on port `5432` with the following credentials:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
```

#### Github OAuth

You should ask for the Github OAuth credentials from the team.

```env
GITHUB_CLIENT_ID="[your_oauth_app_client_id]"
GITHUB_CLIENT_SECRET="[your_oauth_app_client_secret]"
```

#### CORS

You can set the CORS origin to allow requests from a specific domain.

```env
CORS_ORIGIN="http://localhost:5173"
```

#### JWT

Generate a JWT secret key using the following command:

```bash
openssl rand -hex 32
```

```env
JWT_SECRET="****"
JWT_EXPIRATION="7d"
```

### Install Dependencies

```bash
yarn install
```

### Start Development Server

To start the development server, run the following command:

```bash
yarn db:up
yarn db:generate
yarn dev
```

This will start a development server at [http://localhost:4000/](http://localhost:4000/).

#### Docker

You can also start the server using `docker compose`:

```bash
yarn compose
```

### Migrations

To create a new migration or run migrations, run the following commands:

```bash
yarn db:migrate-dev
```

This will start a development server at [http://localhost:4000/](http://localhost:4000/).

## Deployment

### Prisma

To deploy the Prisma schema to the production database, run the following command:

```bash
yarn db:deploy
```

## Development

### Code Structure

- `prisma` - Prisma schema and migrations. Make DB changes here.
- `src` - Source code for the API.
  - `db` - Database data for seeding.
  - `error` - Custom error classes.
  - `modules` - API modules. Structure the API by grouping related functionality into modules. e.g. `auth`, `user`, `game`, etc.
  - `context.ts` - Context for the GraphQL server.
  - `gql.ts` - Generated GraphQL types and resolvers by [GraphQL Code Generator](https://the-guild.dev/graphql/codegen).
  - `index.ts` - Entry point for the API.
  - `prisma.ts` - Prisma client.
  - `seed.ts` - Seed the database with data from `db`.
- `schema.json` - JSON schema for the GraphQL API.

### Code Style

- Use [Prettier](https://prettier.io/) to format the code.
- Use [ESLint](https://eslint.org/) to lint the code.
- Use [TypeScript](https://www.typescriptlang.org/) for type safety.
- Use [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) to generate the GraphQL types and resolvers.
- Use [Prisma](https://www.prisma.io/) to generate the database schema and run migrations.

### Workflow

- Make sure you have a Jira ticket for the work you're doing.
- Create a branch with the ticket number and a short description of the work you're doing. e.g. `VG-123-fix-game-bug`
- Make sure your branch is up to date with `develop` before you start working on it.
- Open a pull request against `develop` and move the ticket to "In Review" in Jira.
- Fill out the pull request template with as much detail as possible.
- Request a code review from the team at `#vetting-games-project`.
- Once the code review is complete, merge the pull request and move the ticket to "Staging" in Jira.
- After the pull request is merged, the staging server will automatically deploy the changes.
- Once the changes are deployed to staging, make sure to run the migrations on the staging database.
- Test the changes on staging and make sure everything is working as expected.

### Code Review

- Make sure the code is up to date with `develop` before you start reviewing.
- Review the branch name and pull request title to make sure they are descriptive.
- Check the pull request description to make sure it contains all the necessary information.
- Change to the branch and run the code locally.
- Run the migrations on the local database.
- Test the changes locally and make sure everything is working as expected.
- Make sure the code is readable and easy to understand expect for the generated code.
- Add comments to the pull request if you have any questions, suggestions or if you find any issues.
- Approve the pull request if everything looks good.

### Generated Code

Ignore the generated code when reviewing the pull request. The generated code is generated using [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) and [Prisma](https://www.prisma.io/). You can find the configuration files for these tools in the `codegen.yml` and `prisma/schema.prisma` files.

Files:

- `prisma/schema.prisma`
- `prisma/migrations/*`
- `src/gql.ts`
- `schema.json`

## Data (Seed)

Our database is seeded with data using a script. You can find the script in `src/seed.ts`. To run the script, run the following command:

```bash
yarn db:seed
```

If you want to update the seed data, you can do so by updating the files in the `src/db` directory.

## Tech Stack

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Prisma](https://www.prisma.io/)
- [Codegen](https://the-guild.dev/graphql/codegen)
- [TypeScript](https://www.typescriptlang.org/)
- [GraphQL](https://graphql.org/)
- [Postgres](https://www.postgresql.org/)
