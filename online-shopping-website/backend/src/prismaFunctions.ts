import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(uName: string, pWord: string, email: string, address1: string) {
  await prisma.user.create({
    data: {
      username: uName,
      password: pWord,
      email: email,
      address1: address1,
      role: "CUSTOMER",
    },
  });
}

export async function allUsers() {
  return await prisma.user.findMany();
}

export async function createItem(
  name: string,
  price: number,
  description: string,
  picture: string,
  promoted: boolean,
  brandId: number,
  sellerId: number
) {
  await prisma.item.create({
    data: {
      name: name,
      price: price,
      description: description,
      picture: picture,
      promoted: promoted,
      seller: {
        connect: { id: sellerId },
      },
      brand: {
        connect: { id: brandId },
      },
    },
  });
}

export async function allItems() {
  return await prisma.item.findMany();
}

export async function createOrder(userId: number, itemIds: number[], totalPrice: number) {
  await prisma.order.create({
    data: {
      user: {
        connect: { id: userId },
      },
      items: {
        connect: itemIds.map((i) => ({ id: i })),
      },
      totalPrice: totalPrice,
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
