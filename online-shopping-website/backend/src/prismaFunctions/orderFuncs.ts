import prisma from "./PrismaClient";

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
