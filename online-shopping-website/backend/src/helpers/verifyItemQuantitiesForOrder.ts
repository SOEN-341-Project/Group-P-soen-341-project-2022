import { Item } from '@prisma/client';

export default async function thereIsEnoughItemQuantities(args: {items: Item[], itemQuantities: number[]}){ //this check is meant to see if there are enough item quantities for every item in an order
  let flag = true;
  args.items.forEach((item, index) => {
    if (item.totalQuantity < args.itemQuantities[index]) {flag = false;}
  });
  return flag;
}