import Cloud from "@google-cloud/storage";
import path from "path";
const googleKey = path.join(__dirname, "../../keys/gckey.json");

const { Storage } = Cloud;
export const storage = new Storage({
  keyFilename: googleKey,
  projectId: "bobble-db",
});
