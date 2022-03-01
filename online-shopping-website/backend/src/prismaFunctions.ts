import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export type UserRole = "CUSTOMER" | "SELLER" | "ADMIN";

export async function createUser(args: {
  pWord: string;
  email: string;
  role: UserRole;
  address1: string;
  uName?: string;
  firstName?: string;
  lastName?: string;
  sellerName?: string;
}) {
  return await prisma.user.create({
    data: {
      username: args.uName,
      password: args.pWord,
      email: args.email,
      role: args.role,
      address1: args.address1,
      firstName: args.firstName,
      lastName: args.lastName,
      sellerName: args.sellerName,
    },
  });
}

export async function userByEmail(args: { email: string }) {
  return await prisma.user.findUnique({
    where: {
      email: args.email,
    },
  });
}

export async function allUsers() {
  return await prisma.user.findMany();
}

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

export async function createOrder(args: { userId: number; itemIds: number[]; totalPrice: number }) {
  return await prisma.order.create({
    data: {
      user: {
        connect: { id: args.userId },
      },
      items: {
        connect: args.itemIds.map((i) => ({ id: i })),
      },
      totalPrice: args.totalPrice,
    },
  });
}

export async function allOrders() {
  return await prisma.order.findMany({
    select: {
      id: true,
      items: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}
