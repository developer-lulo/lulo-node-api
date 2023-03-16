import DataLoader from "dataloader";
import luloDatabase from "../models";

// custom local options
const options: DataLoader.Options<string, unknown, string> = {};

const getBaseLoader = async (keys) => {
  let userIds = keys;

  let users = await luloDatabase.models.User.findAll({
    where: {
      id: userIds,
    },
  });

  let keyMap = {};
  users.forEach((user) => {
    keyMap[user.id] = user;
  });

  return keys.map((key) => {
    return keyMap[key];
  });
};

const baseLoader = new DataLoader(
  (keys: string[]) => getBaseLoader(keys),
  options
);

export { baseLoader };
