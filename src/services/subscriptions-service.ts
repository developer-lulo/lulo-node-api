import { RedisPubSub } from "graphql-redis-subscriptions";


const isProduction = process.env.NODE_ENV === "production";

const connection = {
  host: isProduction ? process.env.REDISHOST : "localhost",
  port: isProduction ? process.env.REDISPORT : 6379,
  retryStrategy: (times: any) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
};

export const pubsub = new RedisPubSub({
  // @ts-expect-error TS(2322) FIXME: Type '{ host: string; port: string | number; retry... Remove this comment to see the full error message
  connection,
});
