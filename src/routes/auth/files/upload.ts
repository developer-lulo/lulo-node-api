import { Request, Response } from "express"
import util from "util";
import multer from "multer";
import { ForbiddenError } from "apollo-server-core";
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from "uuid";

import serviceAccount from './lulo-upload-files.json'

const storage = new Storage({
    credentials: serviceAccount
});

const bucketName = 'lulo-380819.appspot.com';
const bucket = storage.bucket(bucketName);

const multerStorage = multer.memoryStorage();
const multerUpload = multer({ storage: multerStorage });


export const uploadMulterMiddleware = async (req, res, next) => {
    try {
        const upload = util.promisify(multerUpload.single("file"));
        await upload(req, res);
        next();
    } catch (error) {
        throw {
            message: "Error saving the file",
            error,
        };
    }
};

interface RequestMulter extends Request {
    file: {
        destination?: string;
        filename?: string;
        originalname?: string;
        encoding?: string;
        mimetype?: string;
        size?: number;
        buffer: any
    }
}

export const handler = async (req: RequestMulter, res: Response) => {

    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileName = `${uuidv4()}-${file.originalname}`;
    const destinationPath = `public/${fileName}`
    const fileUpload = bucket.file(destinationPath);

    const blobStream = fileUpload.createWriteStream({
        resumable: false,
    });


    const url = await new Promise((resolve, reject) => {
        blobStream
            .on('error', (error) => {
                reject(error)
            })
            .on('finish', () => {
                const publicUrl = `https://storage.googleapis.com/${bucketName}/${destinationPath}`;
                resolve(publicUrl);
            })


        blobStream.end(file.buffer);
    });

    return {
        url
    }

}