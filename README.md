# Vetting Games API

## Tech Stack

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Prisma](https://www.prisma.io/)
- [Codegen](https://the-guild.dev/graphql/codegen)

## Requirements

- [Node.js](https://nodejs.org/en/) (v18.12.0)
- [NVM - Node Version Manager](https://github.com/nvm-sh/nvm)

## Getting Started

### Environment Variables

You'll need some environment variables to get started. You can find a list of them in the `.env.example` file. You can copy this file to `.env` and fill in the values.

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
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

You can also start the server using `docker compose`:

```bash
yarn compose
```

#### Migrations

To create a new migration or run migrations, run the following commands:

```bash
yarn db:migrate-dev
```

This will start a development server at [http://localhost:4000/](http://localhost:4000/).
