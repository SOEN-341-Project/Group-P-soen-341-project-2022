import express, { Response, Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multerMiddleware from "./helpers/multerMiddleware";

import userRouter from "./routes/users";
import brandRouter from "./routes/brands";
import itemRouter from "./routes/items";
import orderRouter from "./routes/orders";

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
app.use("/api/brands", brandRouter);
// item routes
app.use("/api/items", itemRouter);
// order routes
app.use("/api/orders", orderRouter);

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send({ sup: "Cool" });
});

app.post("/post", (req: Request, res: Response) => {
  res.send({ queryParams: req.query, body: req.body, method: req.method }).status(200);
});

app.get("/get", (req: Request, res: Response) => {
  res.send({ queryParams: req.query, body: req.body, method: req.method }).status(200);
});

app.delete("/delete", (req: Request, res: Response) => {
  res.send({ queryParams: req.query, body: req.body, method: req.method }).status(200);
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
