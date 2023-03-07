import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { Sequelize } from "sequelize-typescript";

import { config as databaseConnection } from "../config";

import { User } from "./auth/user";
import { Channel } from "./auth/channel";
import { UsersChannelsJunction } from "./auth/users-channels-junction";
import { ChannelMessage } from "./auth/channel_message";
import { ChannelCharacter } from "./auth/channel_character";
import { ENVIRONMENTS } from "../config/constants";

dotenv.config();
const env = process.env.NODE_ENV || ENVIRONMENTS.DEVELOPMENT;
const databaseConfig = databaseConnection[env];
const sequelize = new Sequelize({
  ...databaseConfig,
  models: [
    User,
    Channel,
    UsersChannelsJunction,
    ChannelMessage,
    ChannelCharacter,
  ],
});

const luloDatabase = {
  sequelize, // db connection
  Sequelize, // Main class
  models: {
    User,
    Channel,
    UsersChannelsJunction,
    ChannelMessage,
    ChannelCharacter,
  },
};

export default luloDatabase;
