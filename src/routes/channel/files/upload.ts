import { Request, Response, NextFunction } from "express";
import multer, { diskStorage } from "multer";
import fs from "fs";
import util from "util";
import { AfterGetMeMidRequest } from "../../../services/auth-service";
import { getServerDomain } from "../../../services/server-service";
import luloDatabase from "../../../models";

interface CustomMulterParams {
  file?: {
    destination?: string;
    filename?: string;
    originalname?: string;
    encoding?: string;
    mimetype?: string;
    size?: number;
  };
}

const storage = diskStorage({
  destination: (req: AfterGetMeMidRequest & CustomMulterParams, file, cb) => {
    let { channelId } = req.params;
    let dir = `uploads/channels/${channelId}`;

    req.file = {
      destination: dir,
      ...req.file,
    };

    if (!fs.existsSync(dir)) {
      return fs.mkdir(dir, { recursive: true }, (error) => cb(error, dir));
    }
    return cb(null, dir);
  },
  filename: (req: AfterGetMeMidRequest & CustomMulterParams, file, cb) => {
    let mimetype = file.mimetype.split("/")[1];
    let filename = `${Date.now()}.${mimetype}`;

    req.file = {
      filename,
      ...req.file,
    };
    return cb(null, filename);
  },
});

export const uploadOnChannel = multer({
  storage,
});

export const uploadMulterMiddleware = async (req, res, next) => {
  try {
    const upload = util.promisify(uploadOnChannel.single("file"));
    await upload(req, res);
    next();
  } catch (error) {
    throw {
      message: "Error saving the file",
      error,
    };
  }
};

export const handler = (
  req: AfterGetMeMidRequest & CustomMulterParams,
  res: Response
) => {
  const domain = getServerDomain();
  const { channelId } = req.params;
  const fileName = req.file.filename;

  const url = `${domain}/channel/${channelId}/get/file/${fileName}`;

  return {
    originalName: req.file.originalname,
    size: req.file.size,
    mimeType: req.file.mimetype,
    url,
  };
};
