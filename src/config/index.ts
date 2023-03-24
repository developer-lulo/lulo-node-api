import dotenv from "dotenv";
dotenv.config();
import { Options } from "sequelize";

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
export const config: DBConfig = {
  development: {
    username: "root",
    password: "1qaz2wsx",
    database: "lulo",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
    logQueryParameters: false,
    dialectOptions: {
      decimalNumbers: true,
    },
    pool: {
      max: 10,
    },
  },
  staging: {
    username: "root",
    password: process.env.LULO_DB_PASS,
    database: "lulo",
    host: process.env.LULO_DB_HOST,
    dialect: "mysql",
    logging: false,
    logQueryParameters: false,
    dialectOptions: {
      decimalNumbers: true,
    },
    pool: {
      max: 10,
    },
  },
};

//@ts-ignore Required for Sequelize migrations interop
export = config;



