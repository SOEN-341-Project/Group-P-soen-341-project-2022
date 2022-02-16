import util from "util";
import { storage } from "./storage";
const bucket = storage.bucket("bobble-pics");

export const uploadFile = (file: Express.Multer.File, filename: String) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    const blob = bucket.file(originalname.replace(/.*[.]/, "bruh.")); //replace spaces with underscores

    const blobStream = blob.createWriteStream({
      //start uploading the file to google
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = util.format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        resolve(publicUrl); //check if the link exists
      })
      .on("error", (e) => {
        reject(`Unable to upload image, something went wrong ${e.message}`);
      })
      .end(buffer); //finish uploading
  });
