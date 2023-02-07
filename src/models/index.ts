
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { Sequelize, DataTypes } from "sequelize";

import databaseConnection from "../config";

import getUserModel from "./auth/user";

dotenv.config()
const env = process.env.NODE_ENV || "development";
const databaseConfig = databaseConnection[env];
const sequelize = new Sequelize(databaseConfig);

const luloDatabase = {
  sequelize, // db connection
  Sequelize, // Main class
  models: {
    User: getUserModel(sequelize, DataTypes),
  },
};

Object.keys(luloDatabase.models).forEach((modelName) => {
  if (luloDatabase.models[modelName].associate) {
    luloDatabase.models[modelName].associate(luloDatabase.models);
  }
});

export default luloDatabase;
