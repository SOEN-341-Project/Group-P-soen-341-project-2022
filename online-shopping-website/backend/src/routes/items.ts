import express, { Response, Request } from 'express';
import uploadFile from '../helpers/uploadFile';
import hasRequiredItemCreationParams from '../helpers/verifyItemCreation';
import { allItems, createItem, deleteItem, findItems, itemById, updateItem } from '../prismaFunctions/itemFuncs';

const itemRouter = express.Router();

itemRouter.post('/create', async (req: Request, res: Response) => {
  try {
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

itemRouter.delete('/delete', async (req: Request, res: Response) => {
  // TODO: make sure an admin or only the seller that created this item is allowed to delete
  const itemId = parseInt(req.query['id'] as string);
  try {
    if (itemId === undefined || isNaN(itemId)) {
      throw new Error('ID is invalid');
    }
    const deletedItem = await deleteItem({ id: itemId });
    // TODO: delete the picture from google cloud
    res.status(200).json(deletedItem);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

itemRouter.post('/update', async (req: Request, res: Response) => {
  // TODO: make sure only the seller that created this item is allowed to update
  const isPromoted = req.body.promoted === 'true';
  const itemId = parseInt(req.body.id);
  try {
    if (itemId === undefined || isNaN(itemId)) {
      throw new Error('ID is invalid');
    }
    const oldItem = await itemById({ id: itemId });
    if (oldItem === undefined || oldItem === null) {
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

itemRouter.get('/find', async (req: Request, res: Response) => {
  const itemId = parseInt(req.query['id'] as string);
  try {
    const item = await itemById({ id: itemId });
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

itemRouter.get('/findAll', async (req: Request, res: Response) => {
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

itemRouter.get('/all', async (req: Request, res: Response) => {
  const items = await allItems();
  res.status(200).json(items);
});

export default itemRouter;
