import { Express, Request, Response } from "express";
import { handler as SigInHandler } from "./auth/signin";
import { handler as SignUpHandler } from "./auth/signup";

export interface LuloRoute {
  path: string;
  type: "post" | "get";
  handler: Function;
}

const routes: LuloRoute[] = [
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
];

export const loadRoutes = (app: Express) => {
  routes.forEach((route) => {
    app[route.type](route.path, async (req: Request, res: Response) => {
      try {
        const result = await route.handler(req, res);
        res.status(200).send({
          success: true,
          ...result,
        });
      } catch (error) {
        res.status(error.code || 500).send({
          success: false,
          data: {
            ...error,
            rawErrorMessage: error.message
          },
        });
      }
    });
  });
};
