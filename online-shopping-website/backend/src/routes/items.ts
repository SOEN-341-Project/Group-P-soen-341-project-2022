import express, { Response, Request } from 'express';
import uploadFile from '../helpers/uploadFile';
import hasRequiredItemCreationParams from '../helpers/verifyItemCreation';
import { allItems, createItem, deleteItem, findItems, itemById, updateItem } from '../prismaFunctions/itemFuncs';
import {objectFromRequest} from '../helpers/jwtFuncs';
import { User, UserRole } from '@prisma/client';
import { deleteUnusedBrands } from "../prismaFunctions/brandFuncs";

const itemRouter = express.Router();

itemRouter.post('/create', async (req: Request, res: Response) => {
  const user = objectFromRequest(req);
  try {
    if (user == undefined || user == null || (user as User).role !== UserRole.SELLER) {
      throw new Error('Invalid Authorization');
    }
    if (
      !hasRequiredItemCreationParams({
        name: req.body.name,
        price: parseFloat(req.body.price),
        description: req.body.description,
        picture: req.file,
        brandId: parseInt(req.body.brandId),
        sellerId: parseInt(req.body.sellerId),
      })
    ) {
      throw new Error('Data missing or invalid');
    }
    const isPromoted = req.body.promoted == 'true';
    const itemNoPic = await createItem({
      name: req.body.name,
      price: parseFloat(req.body.price),
      description: req.body.description,
      picture: 'https://storage.googleapis.com/bobble-pics/image-not-found.png',
      brandId: parseInt(req.body.brandId),
      sellerId: parseInt(req.body.sellerId),
      promoted: isPromoted,
      salePrice: isNaN(parseFloat(req.body.salePrice)) ? undefined : parseFloat(req.body.salePrice),
      totalQuantity: isNaN(parseFloat(req.body.totalQuantity)) ? undefined : parseFloat(req.body.totalQuantity),
    });
    const pictureURL = await uploadFile({
      file: req.file as Express.Multer.File,
      filename: itemNoPic.id.toString(),
      path: 'products/',
    });
    const item = await updateItem({
      itemId: itemNoPic.id,
      picture: pictureURL as string,
    });
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

itemRouter.delete('/delete', async (req: Request, res: Response) => { // deletes the item with the id thats passed in 
  const user = objectFromRequest(req);
  const itemId = parseInt(req.query['id'] as string);
  try {
    // only sellers or admins allowed
    if (user == undefined || user == null || (user as User).role === UserRole.CUSTOMER) {
      throw new Error('Invalid Authorization');
    }
    if (itemId === undefined || isNaN(itemId)) {
      throw new Error('ID is invalid');
    }
    const item = await itemById({ id: itemId })
    
    // check if the item being deleted is owned by this seller or is an admin
    if ((user as User).role === UserRole.SELLER && item?.sellerId !== (user as User).id){
      throw new Error('Invalid Authorization');
    }
    const deletedItem = await deleteItem({ id: itemId });
    // TODO: delete the picture from google cloud
    if(deletedItem){
      // if that was the last item in a brand, delete the brand entirely and all others that may not have items either
      await deleteUnusedBrands();
    }
    res.status(200).json(deletedItem);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

itemRouter.post('/update', async (req: Request, res: Response) => { // updates the item
  const user = objectFromRequest(req);
  const isPromoted = req.body.promoted === 'true';
  const itemId = parseInt(req.body.id);
  try {
    if (user == undefined || user == null || (user as User).role === UserRole.CUSTOMER) {
      throw new Error('Invalid Authorization');
    }
    if (itemId === undefined || isNaN(itemId)) {
      throw new Error('ID is invalid');
    }
    const oldItem = await itemById({ id: itemId });
    if (oldItem === undefined || oldItem === null || oldItem.sellerId !== (user as User).id) {
      throw new Error('Item Not Found');
    }
    let pictureURL;
    if (req.file !== undefined && req.file !== null) {
      pictureURL = await uploadFile({
        file: req.file,
        filename: oldItem.id.toString(),
        path: 'products/',
      });
    }
    const item = await updateItem({
      itemId: oldItem.id,
      name: req.body.name || oldItem.name,
      price: parseFloat(req.body.price) || oldItem.price,
      description: req.body.description || oldItem.description,
      picture: pictureURL || oldItem.picture,
      promoted: isPromoted || oldItem.promoted,
      salePrice: isNaN(parseFloat(req.body.salePrice)) ? undefined : parseFloat(req.body.salePrice),
      totalQuantity: isNaN(parseInt(req.body.totalQuantity)) ? undefined : parseInt(req.body.totalQuantity),
    });
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

itemRouter.get('/find', async (req: Request, res: Response) => { // finds item by id
  const itemId = parseInt(req.query['id'] as string);
  try {
    const item = await itemById({ id: itemId });
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

itemRouter.get('/findAll', async (req: Request, res: Response) => { // finds item by name, sellerId or brandId or any combination of these
  const searchName = req.query['name'] as string;
  const sellerId = parseInt(req.query['sellerId'] as string);
  const brandId = parseInt(req.query['brandId'] as string);
  try {
    const results = await findItems({
      name: searchName,
      sellerId: isNaN(sellerId) ? undefined : sellerId,
      brandId: isNaN(brandId) ? undefined : brandId,
    });
    res.status(200).json(results);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

itemRouter.get("/all", async (req: Request, res: Response) => { // finds all items
  const items = await allItems();
  res.status(200).json(items);
});

export default itemRouter;
