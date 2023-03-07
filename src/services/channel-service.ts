import luloDatabase from "../models";
import { UserAttributes } from "../models/auth/user";

export const userHasAccessToChannel = async (
  user: UserAttributes,
  channelId: string
): Promise<boolean> => {
  return await luloDatabase.sequelize.transaction(async (transaction) => {
    const currChannel = await luloDatabase.models.Channel.findByPk(channelId, {
      transaction,
    });

    if (!currChannel) {
      throw {
        message: "Channel not found",
        where: `validating userHasAccessToChannel for channelId:"${channelId}"`,
      };
    }

    const hasAccess = await luloDatabase.models.UsersChannelsJunction.findOne({
      where: {
        channelId,
        userId: user.id,
      },
      transaction,
    });

    return !!hasAccess;
  });
};


