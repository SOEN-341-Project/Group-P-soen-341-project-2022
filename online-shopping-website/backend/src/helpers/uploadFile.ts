import util from "util";
import { storage } from "./storage";
const bucket = storage.bucket("bobble-pics");

const uploadFile = (args: { file: Express.Multer.File; path: string }): Promise<string> => // returns a link to the file
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

    const filename = uuid();

    const { originalname, buffer } = args.file;

    //create the place where the file is gonna go in the database
    const blob = bucket.file(originalname.replace(/.*[.]/, args.path + filename + ".")); //replace everything before the filetype with the filename and put it in a folder

    const blobStream = blob.createWriteStream({
      //start uploading the file to google
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = util.format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        console.log("Upload finished successfully " + publicUrl);
        resolve(publicUrl); //return the link to the image
      })
      .on("error", (e) => {
        console.log(`Unable to upload image, something went wrong: ${e.message}`)
        reject(`Unable to upload image, something went wrong: ${e.message}`);
      })
      .end(buffer); //write the file to the cloud
  });

function uuid() {
  return(Math.floor(Math.random() * Math.random() * Date.now()))
}

export default uploadFile;
