import express, { Response, Request } from 'express';
import convertStringToArray from '../helpers/convertStringToArray';
import isObjectOnlyInts from '../helpers/isObjectOnlyInts';
import hasRequiredOrderCreationParams from '../helpers/verifyOrderCreation';
import {
  allOrders,
  createOrder,
  deleteOrder,
  orderByItem,
  orderByUser,
  updateOrder,
  orderById,
} from '../prismaFunctions/orderFuncs';
import { objectFromRequest } from '../helpers/jwtFuncs';
import { UserRole, User } from '@prisma/client';

const orderRouter = express.Router();

orderRouter.post('/create', async (req: Request, res: Response) => {
  const user = objectFromRequest(req);
  try {
    if (user == undefined || user == null || (user as User).role !== UserRole.CUSTOMER) {
      throw new Error('Invalid Authorization');
    }
    const { itemIds, itemQuantities, err } = validateOrder(req, false);
    if (err !== '') {
      throw err;
    }

    const newOrder = await createOrder({
      userId: parseInt(req.body.userId as string),
      itemIds: itemIds,
      itemQuantities: itemQuantities,
      totalPrice: parseFloat(req.body.totalPrice as string),
    });
    res.json(newOrder).status(200);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

orderRouter.delete('/delete', async (req: Request, res: Response) => { // deletes an existing order by id
  const user = objectFromRequest(req);
  const orderId = parseInt(req.query['id'] as string);
  try {
    if (user == undefined || user == null) {
      throw new Error('Invalid authentication');
    }
    if (orderId === undefined || isNaN(orderId)) {
      throw new Error('ID is invalid');
    }
    const oldOrder = await orderById({ orderId: orderId });
    if (oldOrder == null) {
      throw new Error('Order not found');
    }
    if (oldOrder.userId !== (user as User).id || (user as User).role !== UserRole.ADMIN) {
      throw new Error('Invalid authentication');
    }

    const deletedOrder = await deleteOrder({ orderId: orderId });
    res.json(deletedOrder).status(200);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

orderRouter.post('/update', async (req: Request, res: Response) => { // updates an existing order
  // needs all items and quantities for it to work
  const user = objectFromRequest(req);
  const orderId = parseInt(req.query['id'] as string);
  try {
    if (user == undefined || user == null) {
      throw new Error('Invalid authentication');
    }
    if (orderId === undefined || isNaN(orderId)) {
      throw new Error('ID is invalid');
    }
    const oldOrder = await orderById({ orderId: orderId });
    if (oldOrder == null) {
      throw new Error('Order not found');
    }
    if (oldOrder.userId !== (user as User).id) {
      throw new Error('Invalid authentication');
    }
    const { itemIds, itemQuantities, err } = validateOrder(req, true);
    console.log(err);
    if (err) {
      throw err;
    }

    const newOrder = await updateOrder({
      orderId: orderId,
      itemIds: itemIds,
      itemQuantities: itemQuantities,
      totalPrice: parseFloat(req.body.totalPrice as string),
    });
    res.json(newOrder).status(200);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

orderRouter.get('/find', async (req: Request, res: Response) => { // finds order by the order's id
  const search = parseInt(req.query['id'] as string);
  try {
    if (search === undefined || isNaN(search)) {
      throw new Error('ID is invalid');
    }
    const orders = await orderById({ orderId: search });
    res.json(orders).status(200);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});
orderRouter.get('/findByItem', async (req: Request, res: Response) => { // finds order by itemId
  const search = parseInt(req.query['id'] as string);
  try {
    if (search === undefined || isNaN(search)) {
      throw new Error('ID is invalid');
    }
    const orders = await orderByItem({ itemId: search });
    res.json(orders).status(200);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

//find orders by user
orderRouter.get('/findByUser', async (req: Request, res: Response) => {
  const user = objectFromRequest(req); // authentication check
  let userId: number = parseInt(req.query['id'] as string); // should only be used by admins looks up orders of other people
  try{
    if (user == undefined || user == null) {
      throw new Error('Invalid authentication');
    }
    if(!isNaN(userId) && (user as User).role !== UserRole.ADMIN){ // non admins can't check other peoples orders
      throw new Error('You need to be an admin to view orders of other users.');
    }
    if(isNaN(userId) && (user as User).role === UserRole.ADMIN){ // admins need to pass in a user id to check their order
      throw new Error('Missing parameter "id" in request');
    }
    //if not an admin the order id passed is the user one
    if ((user as User).role !== UserRole.ADMIN){
      userId = (user as User).id;
    }
    const orders = await orderByUser({userId: userId});
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json({ error: e, message: e.meta?.cause || e.message });
  }
});

orderRouter.get('/all', async (req: Request, res: Response) => { // find all orders
  await allOrders()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ error: e, message: e.message });
    });
});

export default orderRouter;

function validateOrder(req: Request, update: boolean) {
  let itemIds: number[] = [];
  let itemQuantities: number[] = [];
  let err = '';
  if (typeof req.body.itemIds === 'string') itemIds = convertStringToArray(req.body.itemIds);
  else if (typeof req.body.itemIds === 'object' && isObjectOnlyInts(req.body.itemIds))
    itemIds = req.body.itemIds as number[];
  else {
    itemIds = [];
    err = err.concat('Invalid Item Ids ');
  }

  if (typeof req.body.itemQuantities === 'string') itemQuantities = convertStringToArray(req.body.itemQuantities);
  else if (typeof req.body.itemQuantities === 'object' && isObjectOnlyInts(req.body.itemQuantities))
    itemQuantities = req.body.itemQuantities as number[];
  else {
    itemQuantities = [];
    err = err.concat('Invalid Item Quantities ');
  }

  if (itemIds.length !== itemQuantities.length) {
    itemIds = [];
    itemQuantities = [];
    err = err.concat('Invalid arrays ');
  }

  if (
    !hasRequiredOrderCreationParams({
      userId: parseInt(req.body.userId as string),
      itemIds: itemIds,
      itemQuantities: itemQuantities,
      totalPrice: parseFloat(req.body.totalPrice as string),
    }) &&
    !update
  )
    err = err.concat('Invalid Data ');
  return { itemIds: itemIds, itemQuantities: itemQuantities, err: err };
}
