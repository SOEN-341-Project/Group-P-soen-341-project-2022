import util from "util";
import { storage } from "./storage";
const bucket = storage.bucket("bobble-pics");

export const uploadFile = (file) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname.replace(/ /g, "_")); //replace spaces with underscores
    const blobStream = blob.createWriteStream({
      //start uploading the file to google
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = util.format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        resolve(publicUrl); //check if the link exists
      })
      .on("error", () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer); //finish uploading
  });
