import { Storage } from "@google-cloud/storage";
import path from "path";
const googleKey = path.join(__dirname, "../../keys/gckey.json");

export const storage = new Storage({
  keyFilename: googleKey,
  projectId: "bobble-db",
});
// this file is just used to give us a storage object that we can just call on whenever without having to make it ever again
// its also should be the only place that the google cloud key should be seen
