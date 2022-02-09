import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const port = 4000;

const prisma = new PrismaClient();

// express testing start
app.get("/", (req: Request, res: Response) => {
  res.send({ sup: "Cool" });
});

app.get("/api/:id", (req: Request, res: Response) => {
  const cool = req.method;
  res.send({ sup: "API", method: cool, id: req.params.id });
});

/* app.listen(port, () => {
  console.log("listening on port " + port);
}); */
// express testing end

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function main() {
  //await createItem("water");
  const create = await createUser("coolUser", "coolPassword", "cool", "guy");
  //const items = await allItems();
  //console.log(items);
  //const itemIds = items.map((i) => i.id);
  //createOrder(1, itemIds);
  //const orders = await allOrders();
  //console.log(orders);
  const users = await allUsers();
  console.log(users);
}

async function createUser(uName: string, pWord: string, email: string, address1: string) {
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

async function allUsers() {
  return await prisma.user.findMany();
}

/* async function createItem(name: string) {
  await prisma.item.create({
    data: {
      name: name,
    },
  });
} */

async function allItems() {
  return await prisma.item.findMany();
}

/* async function createOrder(userId, itemIds) {
  await prisma.order.create({
    data: {
      user: {
        connect: { id: userId },
      },
      items: {
        connect: itemIds.map((i) => ({ id: i })),
      },
    },
  });
} */

async function allOrders() {
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
