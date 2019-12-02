# Nest starter

## Description

[Nest](https://github.com/nestjs/nest) framework starter repository.

### Technologies

* Language
    * Docs
        * TypeScript: https://www.typescriptlang.org/docs/
    * Packages
        * typescript: https://github.com/microsoft/TypeScript

* Web Application Framework
    * Docs
        * NestJS: https://docs.nestjs.com/
    * Packages
        * @nestjs: https://github.com/nestjs/nest

* Database Access
    * Docs
        * TypeORM: https://typeorm.io/
            * Supports MySQL / Postgres / SQLite And more...
            * Automatic migrations generation
    * Packages
        * @nestjs/typeorm: https://github.com/nestjs/typeorm
        * typeorm: https://github.com/typeorm/typeorm

* GraphQL
    * Docs
        * GraphQL: https://graphql.org/learn/
        * Apollo: https://www.apollographql.com/docs/
        * TypeGraphQL: https://typegraphql.ml/
    * Packages
        * @nestjs/graphql: https://github.com/nestjs/graphql
        * apollo-server-express: https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express
        * graphql-tools: https://github.com/apollographql/graphql-tools
        * graphql: https://github.com/graphql/graphql-js
        * type-graphql: https://github.com/19majkel94/type-graphql

* Validation
    * class-validator: https://github.com/typestack/class-validator

* Serialization
    * class-transformer: https://github.com/typestack/class-transformer

* Security
    * helmet: https://github.com/helmetjs/helmet
    * bcrypt: https://github.com/kelektiv/node.bcrypt.js
    * CORS: NestJS built-in

* JWT Authentication
    * Docs
        * JWT: https://jwt.io/
        * JWT Node.js: https://github.com/auth0/node-jsonwebtoken
        * Passport: http://www.passportjs.org/
    * Packages
        * @nestjs/passport: https://github.com/nestjs/passport
        * passport: https://github.com/jaredhanson/passport
        * @nestjs/jwt: https://github.com/nestjs/jwt
        * passport-jwt: https://github.com/mikenicholson/passport-jwt

* Health Check
    * @nestjs/terminus: https://github.com/nestjs/terminus
    * @godaddy/terminus: https://github.com/godaddy/terminus

* 12-Factor based config
    * `src/config/config.service.ts`
    * `src/config/config.env.ts`

* Linter
    * Docs
        * ESLint: https://eslint.org/
    * Packages
        * eslint: https://github.com/eslint/eslint
        * eslint-config-airbnb: https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb

* Formatter
    * Docs
        * Prettier: https://prettier.io/
    * Packages
        * prettier: https://github.com/prettier/prettier
        * eslint-plugin-prettier: https://github.com/prettier/eslint-plugin-prettier
        * eslint-config-prettier: https://github.com/prettier/eslint-config-prettier
        * @typescript-eslint/eslint-plugin: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin

* Test
    * Docs
        * Jest: https://jestjs.io/
    * Packages
        * jest: https://github.com/facebook/jest

* Documentation
    * Docs
        * Compodoc: https://compodoc.app/
    * Packages
        * @compodoc/compodoc: https://github.com/compodoc/compodoc

* Documentation OpenAPI
    * Docs
        * OpenAPI: https://www.openapis.org/
        * Swagger UI: https://swagger.io/tools/swagger-ui/
    * Packages
        * @nestjs/swagger: https://github.com/nestjs/swagger
        * swagger-ui-express: https://github.com/scottie1984/swagger-ui-express

## Installation

```bash
yarn global add @nestjs/cli
yarn install
```

## Running the app

```bash
# development
yarn run start

# watch mode
yarn run start:dev

# production mode
yarn run start:prod
```

## Test

```bash
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```

## DB migration
```bash
# generate
yarn run migration:generate <name>
# run
yarn run migration:run
# dry run
yarn run schema:log
```

## Documentation
```bash
yarn run doc
```

## How would I set this up myself?
```bash
# clone
git clone https://github.com/nestjs/typescript-starter.git
cd typescript-starter
# graphql
yarn add @nestjs/graphql apollo-server-express graphql-tools graphql
yarn add type-graphql
# database access
yarn add @nestjs/typeorm typeorm
yarn add sqlite3 pg
yarn add pluralize
# validation
yarn add class-validator
# serialization
yarn add class-transformer
# security
yarn add helmet
yarn add bcrypt
yarn add -D @types/bcrypt
# auth
yarn add @nestjs/passport passport
yarn add @nestjs/jwt passport-jwt
yarn add passport-mock-strategy
# performance
yarn add compression
# health check
yarn add @nestjs/terminus @godaddy/terminus
# documentation
yarn add -D @compodoc/compodoc
# documentation openapi
yarn add @nestjs/swagger swagger-ui-express
# lint
yarn add -D eslint
yarn add -D eslint-plugin-import
yarn add -D eslint-plugin-react
yarn add -D eslint-plugin-jsx-a11y
yarn add -D eslint-config-airbnb
# format
yarn add -D eslint-config-prettier eslint-plugin-prettier
yarn add -D @typescript-eslint/eslint-plugin
```

## Copyright

This repository is based on typescript-starter.  
https://github.com/nestjs/typescript-starter  

Copyright (c) 2017-2019 Kamil Myśliwiec <http://kamilmysliwiec.com>  
https://opensource.org/licenses/MIT  
