import { Sequelize } from "sequelize-typescript";

import { config as databaseConnection } from "../config";

import { User } from "./auth/user";
import { Channel } from "./auth/channel";
import { UsersChannelsJunction } from "./auth/users-channels-junction";
import { ChannelMessage } from "./auth/channel_message";
import { ChannelCharacter } from "./auth/channel_character";
import { ENVIRONMENT } from "../config/constants";
import { UsersCharactersJunction } from "./auth/users-characters-junction";

const databaseConfig = databaseConnection[ENVIRONMENT];
const sequelize = new Sequelize({
  ...databaseConfig,
  models: [
    User,
    Channel,
    UsersChannelsJunction,
    ChannelMessage,
    ChannelCharacter,
    UsersCharactersJunction,
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
    UsersCharactersJunction
  },
};

export default luloDatabase;
