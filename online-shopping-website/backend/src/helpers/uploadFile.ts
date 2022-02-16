import util from "util";
import { storage } from "./storage";
const bucket = storage.bucket("bobble-pics");

const bucketLocations = ["products/"]; // this might not be necessary but we can have different folders

export const uploadFile = (file: Express.Multer.File, filename: string) =>
  // if you are a little confused, a promise is essentially a 'promise' that the function will eventually resolve but it can do this in the background so other things can run
  new Promise((resolve, reject) => {
    // check if file is a picture
    if (
      file.mimetype != "image/jpeg" &&
      file.mimetype != "image/png" &&
      file.mimetype != "image/tiff" &&
      file.mimetype != "image/webp"
    ) {
      throw (new Error().message = util.format(`Unsupported mime type ${file.mimetype}`));
    }

    filename = filename.replace(/ /g, "_"); // replace spaces with underscores

    const { originalname, buffer } = file;

    //create the place where the file is gonna go in the database
    const blob = bucket.file(originalname.replace(/.*[.]/, bucketLocations[0] + filename + ".")); //replace everything before the filetype with the filename and put it in a folder

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
        reject(`Unable to upload image, something went wrong: ${e.message}`);
      })
      .end(buffer); //finish uploading
  });
