import { Storage } from "@google-cloud/storage";
import path from "path";
const googleKey = path.join(__dirname, "../../keys/gckey.json");

export const storage = new Storage({
  keyFilename: googleKey,
  projectId: "bobble-db",
});
