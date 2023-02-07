import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { Sequelize } from "sequelize-typescript";

import databaseConnection from "../config";

import { User } from "./auth/user";

dotenv.config();
const env = process.env.NODE_ENV || "development";
const databaseConfig = databaseConnection[env];
const sequelize = new Sequelize({
  ...databaseConfig,
  models: [User],
});

const luloDatabase = {
  sequelize, // db connection
  Sequelize, // Main class
  models: {
    User,
  },
};

export default luloDatabase;
