import { RedisPubSub } from "graphql-redis-subscriptions";
import { REDIS_HOST, REDIS_PORT } from "../config/constants";

const connection = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  retryStrategy: (times: any) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
};

export const pubsub = new RedisPubSub({
  // @ts-expect-error TS(2322) FIXME: Type '{ host: string; port: string | number; retry... Remove this comment to see the full error message
  connection,
});
