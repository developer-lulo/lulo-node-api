import { Request, Response } from "express";
import path from "path";
import fs from "fs";

export const handler = (req: Request, res: Response) => {
  const { channelId, fileName } = req.params;

  const filePath = path.resolve("uploads", "channels", channelId, fileName);
  if (!fs.existsSync(filePath)) {
    throw {
      message: "The file is not on the server, please check your url",
    };
  }

  return {
    customReturn: true,
    customReturnHandler: (req, res) => {
      return res.sendFile(filePath);
    },
  };
};
