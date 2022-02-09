import express, { Response, Request } from "express";
import { BodyParser } from "body-parser";
import multer from "multer";
import { uploadFile } from "./helpers/uploadFile";

const app = express();
const port = 4000;

const multerMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    // max 5 mb files
    filesize: 5 * 1024 * 1024,
  },
});

app.disable("x-powered-by");

app.get("/", (req: Request, res: Response) => {
  res.send({ sup: "Cool" });
});

app.get("/api/:id", (req: Request, res: Response) => {
  const cool = req.method;
  res.send({ sup: "API", method: req.method, id: req.params.id });
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
