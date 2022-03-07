import express, { Response, Request } from "express";
import { format, promisify } from "util";
import bcrypt from "bcrypt";
import hasRequiredUserCreationParams from "../helpers/verifyUserCreation";
import { UserRole } from "@prisma/client";
import { createUser, allUsers, userByEmail, userById, updateUser } from "../prismaFunctions/userFuncs";

const userRouter = express.Router();

userRouter.post("/register", async (req: Request, res: Response) => {
  try {
    // verify that necessary parameters are there
    const role = (req.body.role as string).toUpperCase();
    if (
      !hasRequiredUserCreationParams({
        email: req.body.email,
        password: req.body.password,
        address1: req.body.address1,
        role: role,
      })
    ) {
      throw (new Error().message = format(`Data missing`));
    }
    const usr_role: UserRole = role as UserRole;
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
    res.status(200).json({ newUser });
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

userRouter.post("/signin", async (req: Request, res: Response) => {
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

userRouter.post("/update", async (req: Request, res: Response) => {
  const usr_id = parseInt(req.body.id);
  const usr = await userById({ id: usr_id });
  try {
    if (isNaN(usr_id)) res.status(400).json({ error: "Invalid Id" });
    if (usr === null || usr === undefined) {
      throw new Error(`User ${req.body.id} does not exist`);
    }
    // TODO: check authentication and see if user is changing their own account
    let encrypted_password: string | undefined;
    if (req.body.password !== undefined) {
      //new password
      encrypted_password = await bcrypt.hash(req.body.password, 5);
    }
    const new_usr = await updateUser({
      userId: usr.id,
      email: req.body.email || usr.email,
      pWord: encrypted_password || usr.password,
      role: usr.role,
      uName: req.body.username || usr.username,
      firstName: req.body.firstName || usr.firstName,
      lastName: req.body.lastName || usr.lastName,
      address1: req.body.address1 || usr.address1,
      sellerName: req.body.sellerName || usr.sellerName,
    });
    res.status(200).json({ user: new_usr });
  } catch (e) {
    if (e.code === "P2002") {
      e.message = "Unique constraint on " + e.meta.target + " failed";
    }
    res.status(400).json({ error: e, message: e.message });
  }
});

userRouter.get("/all", async (req: Request, res: Response) => {
  //TODO: authenticate only admins for this route
  await allUsers()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ error: e, message: e.message });
    });
});

export default userRouter;
