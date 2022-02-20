import express, { Response, Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import { uploadFile } from "./helpers/uploadFile";

const app = express();
const port = 4000;

const multerMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    // max 5 mb files
    fileSize: 5 * 1024 * 1024,
  },
});

app.use(cors()); // cors allows us to get files from elsewhere if we need to use it
app.disable("x-powered-by"); // gets rid of the "x-powered-by" header
app.use(multerMiddleware.single("picture")); // the middleware that lets us process pictures
app.use(bodyParser.json()); // middleware that enterprets json
app.use(bodyParser.urlencoded({ extended: false })); // middleware that enterprets urlencoded

app.post("/uploads", async (req, res, next) => {
  try {
    const myFile = req.file;
    const name = req.body.name;
    const imageUrl = await uploadFile(myFile, name);
    res.status(200).json({
      message: "Upload was successful",
      data: imageUrl,
    });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send({ sup: "Cool" });
});

app.get("/api/:id", (req: Request, res: Response) => {
  res.send({ sup: "API", method: req.method, id: req.params.id });
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
