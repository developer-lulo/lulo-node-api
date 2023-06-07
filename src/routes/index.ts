import { Express, Request, Response } from "express";
import packageJson from "../../package.json";
import { handler as SigInHandler } from "./auth/signin";
import { handler as SignUpHandler } from "./auth/signup";
import { handler as DbBackupHandler } from "./scripts/db-backup";
import { handler as uploadFileHandler, uploadMulterMiddleware } from './auth/files/upload'

import { getMeMiddleWare } from "../services/auth-service";



export interface LuloRoute {
  path: string;
  type: "post" | "get";
  handler: Function;
  middlewares?: any[];
}

const routes: LuloRoute[] = [
  {
    path: "/",
    type: "get",
    handler: (req, res) => {
      return {
        name: packageJson.name,
        version: packageJson.version,
      };
    },
  },
  {
    path: "/auth/signin",
    type: "post",
    handler: SigInHandler,
  },
  {
    path: "/auth/signup",
    type: "post",
    handler: SignUpHandler,
  },
  {
    path: "/db/make-backup",
    type: "get",
    handler: DbBackupHandler,
  },
  {
    path: "/auth/files/upload",
    type: 'post',
    middlewares: [
      // getMeMiddleWare, // add "me" object to req (AUTH)
      uploadMulterMiddleware
    ],
    handler: uploadFileHandler
  }
];

export const loadRoutes = (app: Express) => {
  routes.forEach((route) => {
    app[route.type](
      // path
      route.path,
      // middlewares execution
      async (req: Request, res: Response, next) => {
        try {
          if (route.middlewares && route.middlewares.length) {
            for (let middleware of route.middlewares) {
              await middleware(req, res, () => { });
            }
          }
          next();
        } catch (error) {
          res.status(error.code || 500).send({
            success: false,
            data: {
              where: "MIDDLEWARE_EXECUTION",
              ...error,
              rawErrorMessage: error.message,
            },
          });
        }
      },
      // handlers
      async (req: Request, res: Response) => {
        try {
          const result = await route.handler(req, res);

          if (result.customReturn) {
            // used to handle files, check the get channel files route functionality
            result.customReturnHandler(req, res);
          } else {
            return res.status(200).send({
              success: true,
              data: {
                ...result,
              },
            });
          }
        } catch (error) {
          res.status(error.code || 500).send({
            success: false,
            data: {
              where: "HANDLER_EXECUTION",
              ...error,
              rawErrorMessage: error.message,
            },
          });
        }
      }
    );
  });
};

const newNextFuncion = () => { };
