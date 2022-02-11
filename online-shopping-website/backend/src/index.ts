import express, { Response, Request } from "express";
import bodyParser from "body-parser";
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
app.use(multerMiddleware.single("file"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/uploads', async (req, res, next) => {
  try {
    const myFile = req.file
    const imageUrl = await uploadFile(myFile)
    res
      .status(200)
      .json({
        message: "Upload was successful",
        data: imageUrl
      })
  } catch (error) {
    next(error)
  }
})

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err,
    message: 'Internal server error!',
  })
  next()
})

app.get("/", (req: Request, res: Response) => {
  res.send({ sup: "Cool" });
});

app.get("/api/:id", (req: Request, res: Response) => {
  res.send({ sup: "API", method: req.method, id: req.params.id });
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
