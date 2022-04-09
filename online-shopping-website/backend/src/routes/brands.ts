import express, { Response, Request } from 'express';
import hasRequiredBrandCreationParams from '../helpers/verifyBrandCreation';
import uploadFile from '../helpers/uploadFile';
import { objectFromRequest } from '../helpers/jwtFuncs';
import { itemByBrand } from '../prismaFunctions/itemFuncs';
import {
  allBrands,
  brandById,
  brandByName,
  createBrand,
  deleteBrand,
  updateBrand,
} from '../prismaFunctions/brandFuncs';
import { User, UserRole } from '@prisma/client';

const brandRouter = express.Router();

brandRouter.post('/create', async (req: Request, res: Response) => { // creates a brand
  const user = objectFromRequest(req);
  try {
    if (user == undefined || user == null || (user as User).role === UserRole.CUSTOMER) {
      throw new Error('Invalid Authorization');
    }
    if (!hasRequiredBrandCreationParams({ name: req.body.name }))
      throw new Error('Data Missing');

    const brandNoPic = await createBrand({ name: req.body.name, description: req.body.description });
    let pictureURL;
    if (req.file !== undefined) {
      const picture = req.file;
      pictureURL = await uploadFile({ file: picture, path: 'brands/' });
    }
    const brand = await updateBrand({ brandId: brandNoPic.id, picture: pictureURL });
    res.status(200).json(brand);
  } catch (e) {
    res.status(400).json({ error: e, message: e.message });
  }
});

brandRouter.delete('/delete', async (req: Request, res: Response) => { // deletes the brand with the id thats passed in
  const user = objectFromRequest(req);
  const brandId = parseInt(req.query['id'] as string);
  try {
    if (user == undefined || user == null || (user as User).role === UserRole.CUSTOMER) {
      throw new Error('Invalid Authorization');
    }
    if (brandId === undefined || isNaN(brandId)) {
      throw new Error('ID is invalid');
    }
    const itemsAttatchedToBrand = await itemByBrand({id: brandId});
    if (itemsAttatchedToBrand.length > 0) throw new Error('Items exist in brand. Delete the items first');
    const deletedBrand = await deleteBrand({ brandId: brandId });
    // TODO: Delete picture from google
    res.json(deletedBrand).status(200);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

brandRouter.post('/update', async (req: Request, res: Response) => { // updates the brand with the id thats passed in
  // TODO: make sure only admins can use this route (or adjust the database that only the seller that created it can update)
  const user = objectFromRequest(req);

  const brandId = parseInt(req.body.id);
  try {
    if (user == undefined || user == null || (user as User).role !== UserRole.ADMIN) {
      throw new Error('Invalid Authorization');
    }
    if (isNaN(brandId)) throw new Error('Invalid ID');
    const oldBrand = await brandById({ brandId: brandId });
    if (oldBrand === undefined || oldBrand === null) {
      throw new Error('Brand Not Found');
    }
    let pictureURL;
    if (req.file !== undefined) {
      const picture = req.file;
      pictureURL = await uploadFile({ file: picture, path: 'brands/' });
    }
    const brand = await updateBrand({
      brandId: oldBrand.id,
      name: req.body.name || oldBrand.name,
      description: req.body.description || oldBrand.description,
      picture: pictureURL || oldBrand.picture,
    });
    res.status(200).json(brand);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

brandRouter.get('/find', async (req: Request, res: Response) => { // find brands by name
  const search = req.query['name'];
  try {
    if (search === undefined || search === '') {
      throw new Error('No Input Found');
    }
    const results = await brandByName({ name: search as string });
    res.status(200).json(results);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

brandRouter.get('/all', async (req: Request, res: Response) => { // get all brands
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
