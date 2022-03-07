import util from "util";
import { storage } from "./storage";
const bucket = storage.bucket("bobble-pics");

const uploadFile = (args: { file: Express.Multer.File; filename: string; path: string }) =>
  // if you are a little confused, a promise is essentially a 'promise' that the function will eventually resolve but it can do this in the background so other things can run
  new Promise((resolve, reject) => {
    // check if file is a picture
    if (
      args.file.mimetype != "image/jpeg" &&
      args.file.mimetype != "image/png" &&
      args.file.mimetype != "image/tiff" &&
      args.file.mimetype != "image/webp"
    ) {
      throw (new Error().message = util.format(`Unsupported mime type ${args.file.mimetype}`));
    }

    args.filename = args.filename.replace(/ /g, "_"); // replace spaces with underscores

    const { originalname, buffer } = args.file;

    //create the place where the file is gonna go in the database
    const blob = bucket.file(originalname.replace(/.*[.]/, args.path + args.filename + ".")); //replace everything before the filetype with the filename and put it in a folder

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

export default uploadFile;
