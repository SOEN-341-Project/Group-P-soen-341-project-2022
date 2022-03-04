import express, { Response, Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multerMiddleware from "./helpers/multerMiddleware";

import userRouter from "./routes/users";
import brandRouter from "./routes/brands";
const app = express();
const port = process.env.PORT || 8080;

app.use(cors()); // cors allows us to get files from elsewhere if we need to use it
app.disable("x-powered-by"); // gets rid of the "x-powered-by" header

// body parser helps us decode x-www-form-urlencoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// multer decodes multipart/form-data bodies
app.use(multerMiddleware.single("picture"));

// user routes
app.use("/api/users", userRouter);
// brand routes
app.use("/api/brand", brandRouter);

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
