import { AfterGetMeMidRequest } from "../../../services/auth-service";
import { userHasAccessToChannel } from "../../../services/channel-service";

export const userHasAccessToChannelMiddleware = async (
  req: AfterGetMeMidRequest,
  res: Response,
  next: Function
) => {
  const { channelId } = req.params;

  if (!(await userHasAccessToChannel(req.me, channelId))) {
    throw {
      message: "You dont have access to current channel",
    };
  }

  next();
};
