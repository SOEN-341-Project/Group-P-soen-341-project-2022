import prisma from "./prismaClient";

type UserRole = "CUSTOMER" | "SELLER" | "ADMIN";

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
  await prisma.user.create({
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
