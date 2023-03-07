import dotenv from "dotenv";
import { ENVIRONMENTS } from "../config/constants";
dotenv.config();

export const getServerDomain = () => {
  const environment = process.env.NODE_ENV || ENVIRONMENTS.DEVELOPMENT;
  if (environment === ENVIRONMENTS.DEVELOPMENT) {
    return "http://localhost:9000";
  }
  if (environment === ENVIRONMENTS.PRODUCTION) {
    return process.env.PROD_DOMAIN || "https://api.lulo.love";
  }
};
