import { Sequelize, DataTypes } from "sequelize";
import getUserModel from "./auth/user";

import { config } from "../config";

const luloDatabase = new Sequelize(config.development);

const models = {
  User: getUserModel(luloDatabase, DataTypes),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { luloDatabase };
export default models;
