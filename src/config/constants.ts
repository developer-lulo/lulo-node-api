import dotenv from "dotenv";
dotenv.config();

if (!process.env.NODE_ENV) {
  throw new Error("The NODE_ENV var must be declared as env var");
}

export const ENVIRONMENT = process.env.NODE_ENV;
export const isDevelopment = process.env.NODE_ENV === "development";

export const APP_PORT = isDevelopment ? 9000 : process.env.APP_PORT;

export const JWT_SECRET = isDevelopment ? "123pormi" : process.env.JWT_SECRET;

// server domain to be used on creation of file urls, (for saving files in the server, must be updated later for s3)
export const PROD_DOMAIN = isDevelopment
  ? `http://localhost:${APP_PORT}`
  : process.env.PROD_DOMAIN;

// lulo database connection base params
export const LULO_DB_PASS = isDevelopment
  ? "1qaz2wsx"
  : process.env.LULO_DB_PASS;
export const LULO_DB_HOST = isDevelopment
  ? "127.0.0.1"
  : process.env.LULO_DB_HOST;

// graphql path for api and subscriptions
export const SERVER_PATH = "/graphql";

// Redis server for subscriptions so far
export const REDIS_HOST = isDevelopment ? "localhost" : process.env.REDIS_HOST;
export const REDIS_PORT = isDevelopment ? 6379 : process.env.REDIS_PORT;
