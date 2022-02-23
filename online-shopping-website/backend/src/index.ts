import express, { Response, Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import { format } from "util";
import bcrypt from "bcrypt";
import { uploadFile } from "./helpers/uploadFile";
import { createUser, allUsers, userByEmail } from "./prismaFunctions";
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

app.post("/api/users/register", async (req: Request, res: Response, next) => {
  const usr_role: string = req.body.role.toUpperCase();
  try {
    // verify that necessary parameters are there
    if (
      (usr_role !== "CUSTOMER" && usr_role !== "SELLER" && usr_role !== "ADMIN") ||
      req.body.email === undefined ||
      req.body.password === undefined ||
      req.body.address1 === undefined
    ) {
      throw (new Error().message = format(`Data missing`));
    }
    const encrypted_password = await bcrypt.hash(req.body.password, 5); //encrypt password
    const newUser = await createUser({
      email: req.body.email,
      pWord: encrypted_password,
      role: usr_role,
      uName: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address1: req.body.address1,
      sellerName: req.body.sellerName,
    });
    // TODO: give the user an authentication token at this point
    res.status(200).json({ message: "Success" });
  } catch (e) {
    if (e.code === "P2002") {
      e.message = "Unique constraint on " + e.meta.target + " failed";
    }
    res.status(400).json({ error: e, message: e.message });
    next();
  }
});

app.post("/api/users/signin", async (req, res, next) => {
  // check if email is attatched to a user
  const usr = await userByEmail({ email: req.body.email });
  if (usr === null) res.status(400).json({ error: "User not found" });
  // user does exist, check if password is correct
  else {
    const match = await bcrypt.compare(req.body.password, usr.password);
    if (match) {
      // password is correct
      // TODO: give the user an authentication token
      res.status(200).json({ message: "Password is correct" });
    } else {
      // password is incorrect
      res.status(400).json({ error: "Invalid Password", message: "Password is incorrect" });
    }
  }
});

app.get("/api/users/all", async (req, res, next) => {
  //TODO: authenticate only admins for this route
  await allUsers()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ error: e, message: e.message });
      next();
    });
});

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

