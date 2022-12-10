import "dotenv/config";
import { Options } from "sequelize";

// Declare all different environments
export type environments = { development: "Local Development" };

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
};

export default config
