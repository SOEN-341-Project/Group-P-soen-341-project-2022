import prisma from "./PrismaClient";

export async function createItem(args: {
  name: string;
  price: number;
  description: string;
  picture: string;
  promoted: boolean;
  brandId: number;
  sellerId: number;
  salePrice?: number;
  totalQuantity?: number;
}) {
  return await prisma.item.create({
    data: {
      name: args.name,
      price: args.price,
      description: args.description,
      picture: args.picture,
      promoted: args.promoted,
      salePrice: args.salePrice,
      totalQuantity: args.totalQuantity,
      seller: {
        connect: { id: args.sellerId },
      },
      brand: {
        connect: { id: args.brandId },
      },
    },
  });
}

export async function allItems() {
  return await prisma.item.findMany();
}
