import dotenv from "dotenv";
dotenv.config();

if (!process.env.NODE_ENV) {
  throw new Error("The NODE_ENV var must be declared as env var");
}

let DEVELOPMENT_VARS = {
  APP_PORT: 9000,
  JWT_SECRET: "123pormi",
  PROD_DOMAIN: null, // assigned later
  LULO_DB_HOST: "127.0.0.1",
  LULO_DB_PASS: "1qaz2wsx",
  REDIS_HOST: "127.0.0.1",
  REDIS_PORT: 6379,
};
// reassign value
DEVELOPMENT_VARS.PROD_DOMAIN = `http://localhost:${DEVELOPMENT_VARS.APP_PORT}`;

// Switching process of vars by enviroment

export const ENVIRONMENT = process.env.NODE_ENV;
export const isDevelopment = process.env.NODE_ENV === "development";

console.log(`💻 ❗️❗️ Process running as ${process.env.NODE_ENV} service ❗️❗️ 💻`);

export const APP_PORT = isDevelopment
  ? DEVELOPMENT_VARS.APP_PORT
  : process.env.APP_PORT;

export const JWT_SECRET = isDevelopment
  ? DEVELOPMENT_VARS.JWT_SECRET
  : process.env.JWT_SECRET;

// server domain to be used on creation of file urls, (for saving files in the server, must be updated later for s3)
export const PROD_DOMAIN = isDevelopment
  ? DEVELOPMENT_VARS.PROD_DOMAIN
  : process.env.PROD_DOMAIN;

// lulo database connection base params
export const LULO_DB_PASS = isDevelopment
  ? DEVELOPMENT_VARS.LULO_DB_PASS
  : process.env.LULO_DB_PASS;
export const LULO_DB_HOST = isDevelopment
  ? DEVELOPMENT_VARS.LULO_DB_HOST
  : process.env.LULO_DB_HOST;

// graphql path for api and subscriptions
export const SERVER_PATH = "/graphql";

// Redis server for subscriptions so far
export const REDIS_HOST = isDevelopment
  ? DEVELOPMENT_VARS.REDIS_HOST
  : process.env.REDIS_HOST;
export const REDIS_PORT = isDevelopment
  ? DEVELOPMENT_VARS.REDIS_PORT
  : process.env.REDIS_PORT;
