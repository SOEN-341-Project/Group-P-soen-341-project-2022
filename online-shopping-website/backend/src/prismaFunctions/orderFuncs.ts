import prisma from "./PrismaClient";

export async function createOrder(args: {
  userId: number;
  itemIds: number[];
  itemQuantities: number[];
  totalPrice: number;
}) {
  return await prisma.order.create({
    data: {
      itemQuantities: args.itemQuantities,
      user: {
        connect: { id: args.userId },
      },
      items: {
        connect: args.itemIds.map((i) => ({ id: i })),
      },
      totalPrice: args.totalPrice,
    },
    include: { items: true },
  });
}

export async function deleteOrder(args: { orderId: number }) {
  return await prisma.order.delete({
    where: { id: args.orderId },
    include: { items: true },
  });
}

export async function updateOrder(args: {
  orderId: number;
  itemIds: number[];
  itemQuantities: number[];
  totalPrice: number;
}) {
  await prisma.order.update({
    //clear items
    where: { id: args.orderId },
    data: { items: { set: [] } },
  });
  return await prisma.order.update({
    where: { id: args.orderId },
    data: {
      itemQuantities: args.itemQuantities,
      items: { connect: args.itemIds.map((i) => ({ id: i })) },
      totalPrice: args.totalPrice,
    },
    include: { items: true },
  });
}

export async function orderByUser(args:{userId: number}){
  return prisma.order.findMany({ 
    where: { 
      userId: args.userId
    },
  })
}

export async function orderById(args:{orderId: number}){
  return prisma.order.findUnique({
    where: {
      id: args.orderId
    },
  })
}

export async function orderByItem(args: { itemId: number }) {
  return prisma.order.findMany({
    where: {
      items: { some: { id: args.itemId } },
    },
    include: {
      items: true,
    },
  });
}

export async function allOrders() {
  return await prisma.order.findMany({
    include: {
      items: true,
    },
  });
}
