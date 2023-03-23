// Auth Schemas
import userSchema from "./auth/user";
import channelSchema from "./auth/channel";
import messageSchema from "./auth/message";

// lulo Schemas
import channelCharacterSchema from "./lulo/channel-character";

export default [
  userSchema,
  channelSchema,
  channelCharacterSchema,
  messageSchema,
];
