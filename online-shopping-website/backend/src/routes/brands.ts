import express, { Response, Request } from "express";
import hasRequiredBrandCreationParams from "../helpers/verifyBrandCreation";
import uploadFile from "../helpers/uploadFile";
import {
  allBrands,
  brandById,
  brandByName,
  createBrand,
  deleteBrand,
  updateBrand,
} from "../prismaFunctions/brandFuncs";

const brandRouter = express.Router();

brandRouter.post("/create", async (req: Request, res: Response) => {
  // TODO: check if user that added this brand is a seller (or an admin?)
  try {
    if (!hasRequiredBrandCreationParams({ name: req.body.name, description: req.body.description }))
      throw new Error(`Data Missing`);

    const brandNoPic = await createBrand({ name: req.body.name, description: req.body.description });
    let pictureURL;
    if (req.file !== undefined) {
      const picture = req.file;
      const name: string = req.body.name;
      pictureURL = await uploadFile({ file: picture, filename: brandNoPic.id.toString(), path: "brands/" });
    }
    const brand = await updateBrand({ brandId: brandNoPic.id, picture: pictureURL });
    res.status(200).json({ brand: brand });
  } catch (e) {
    res.status(400).json({ error: e, message: e.message });
  }
});

brandRouter.delete("/delete", async (req: Request, res: Response, next) => {
  // TODO: make sure there are no items attached to the brand and that only admins can use this route
  let brandId = parseInt(req.query["id"] as string);
  try {
    if (brandId === undefined || isNaN(brandId)) {
      throw new Error("ID is invalid");
    }
    const deletedBrand = await deleteBrand({ brandId: brandId });
    res.json(deletedBrand).status(200);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta.cause || e.message });
  }
});

brandRouter.post("/update", async (req: Request, res: Response, next) => {
  // TODO: make sure only admins can use this route (or adjust the database that only the seller that created it can update)
  const brandId = parseInt(req.body.id);
  try {
    if (isNaN(brandId)) throw new Error("Invalid ID");
    const oldBrand = await brandById({ brandId: brandId });
    if (oldBrand === undefined || oldBrand === null) {
      throw new Error("Brand Not Found");
    }
    let pictureURL;
    if (req.file !== undefined) {
      const picture = req.file;
      const name: string = req.body.name;
      pictureURL = await uploadFile({ file: picture, filename: oldBrand.id.toString(), path: "brands/" });
    }
    const brand = await updateBrand({
      brandId: oldBrand.id,
      name: req.body.name || oldBrand.name,
      description: req.body.description || oldBrand.description,
      picture: pictureURL || oldBrand.picture,
    });
    res.status(200).json({ brand: brand });
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

brandRouter.get("/find", async (req: Request, res: Response) => {
  let search = req.query["name"];
  try {
    if (search === undefined || search === "") {
      throw new Error("No Input Found");
    }
    const results = await brandByName({ name: search as string });
    res.status(200).json(results);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

brandRouter.get("/all", async (req: Request, res: Response) => {
  await allBrands()
    .then((brands) => {
      res.status(200).json(brands);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ error: e, message: e.message });
    });
});

export default brandRouter;
