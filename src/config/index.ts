import dotenv from "dotenv";
dotenv.config();
import { Dialect, Options } from "sequelize";
import { LULO_DB_HOST, LULO_DB_PASS } from "./constants";

// Declare all different environments
export type environments = {
  development: "Local Development";
  staging: "AWS enviroment";
};

// Based type to force the creating of config objects
export type DBConfig = {
  [key in keyof environments]: Options;
};

// db config objects

const connectionObject = {
  username: "root",
  password: LULO_DB_PASS,
  database: "lulo",
  host: LULO_DB_HOST,
  dialect: "mysql" as Dialect,
  logging: false,
  logQueryParameters: false,
  dialectOptions: {
    decimalNumbers: true,
  },
  pool: {
    max: 10,
  },
};

export const config: DBConfig = {
  development: {
    ...connectionObject,
  },
  staging: {
    ...connectionObject,
  },
};

//@ts-ignore Required for Sequelize migrations interop
export = config;
