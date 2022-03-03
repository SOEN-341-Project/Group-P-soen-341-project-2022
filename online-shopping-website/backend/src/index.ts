import express, { Response, Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import { uploadFile } from "./helpers/uploadFile";
import userRouter from "./routes/users";
const app = express();
const port = process.env.PORT || 8080;

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

// temporary route
app.post("/uploads", async (req, res, next) => {
  try {
    const myFile = req.file;
    if (myFile === undefined) {
      throw new Error("File not recieved");
    }
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

// user routes

app.use("/api/users", userRouter);

// end user routes
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send({ sup: "Cool" });
});

app.get("/api/test", (req: Request, res: Response) => {
  res.send({ sup: "This product is available" });
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
