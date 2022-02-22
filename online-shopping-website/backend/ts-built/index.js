"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const util_1 = require("util");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uploadFile_1 = require("./helpers/uploadFile");
const prismaFunctions_1 = require("./prismaFunctions");
const app = (0, express_1.default)();
const port = 4000;
const multerMiddleware = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        // max 5 mb files
        fileSize: 5 * 1024 * 1024,
    },
});
app.use((0, cors_1.default)()); // cors allows us to get files from elsewhere if we need to use it
app.disable("x-powered-by"); // gets rid of the "x-powered-by" header
app.use(multerMiddleware.single("picture")); // the middleware that lets us process pictures
app.use(body_parser_1.default.json()); // middleware that enterprets json
app.use(body_parser_1.default.urlencoded({ extended: false })); // middleware that enterprets urlencoded
// temporary route
app.post("/uploads", async (req, res, next) => {
    try {
        const myFile = req.file;
        const name = req.body.name;
        const imageUrl = await (0, uploadFile_1.uploadFile)(myFile, name);
        res.status(200).json({
            message: "Upload was successful",
            data: imageUrl,
        });
    }
    catch (error) {
        next(error);
    }
});
// user routes
app.post("/api/users/register", async (req, res, next) => {
    const usr_role = req.body.role.toUpperCase(), usr_email = req.body.email, usr_password = req.body.password;
    try {
        // verify that necessary parameters are there
        if ((usr_role !== "CUSTOMER" && usr_role !== "SELLER" && usr_role !== "ADMIN") ||
            usr_email === undefined ||
            usr_password === undefined) {
            throw (new Error().message = (0, util_1.format)(`Data missing`));
        }
        const encrypted_password = await bcrypt_1.default.hash(usr_password, 5); //encrypt password
        const newUser = await (0, prismaFunctions_1.createUser)({
            email: req.body.email,
            pWord: encrypted_password,
            role: usr_role,
            uName: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address1: req.body.address1,
            sellerName: req.body.sellerName,
        });
        res.status(200).json({ message: "Success" });
    }
    catch (e) {
        if (e.code === "P2002") {
            e.message = "Unique constraint on " + e.meta.target + " failed";
        }
        res.status(400).json({ error: e, message: e.message });
        next();
    }
});
app.get("/api/users/all", async (req, res) => {
    //TODO: authenticate only admins for this route
    const usrs = await (0, prismaFunctions_1.allUsers)();
    res.status(200).json(usrs);
});
// end user routes
app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
    });
    next();
});
app.get("/", (req, res) => {
    res.send({ sup: "Cool" });
});
app.get("/api/:id", (req, res) => {
    res.send({ sup: "API", method: req.method, id: req.params.id });
});
app.listen(port, () => {
    console.log("listening on port " + port);
});
