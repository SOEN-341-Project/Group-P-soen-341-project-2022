import { prismaMock } from "../src/prismaTestEnv";
import { UserRole, createUser } from "../src/prismaFunctions";

test("create a user", async () => {
  const role: UserRole = "CUSTOMER";
  const date: Date = new Date("2022-02-23T21:33:00.952Z");
  const afterUser = {
    id: 2,
    email: "email",
    username: null,
    role: role,
    password: "$2b$05$oDxIuojvMBjzEKXfO2kiSetW4nY1AGOuHInUqF01nRBRAQqbgbiP2",
    createdAt: date,
    updatedAt: date,
    firstName: null,
    lastName: null,
    address1: "your moms",
    sellerName: null,
  };
  const beforeUser = {
    email: "email",
    pWord: "password",
    address1: "your moms",
    role: role,
  };

  prismaMock.user.create.mockResolvedValue(afterUser);

  expect(await createUser(beforeUser)).toEqual({
    id: 2,
    email: "email",
    username: null,
    role: role,
    password: "$2b$05$oDxIuojvMBjzEKXfO2kiSetW4nY1AGOuHInUqF01nRBRAQqbgbiP2",
    createdAt: date,
    updatedAt: date,
    firstName: null,
    lastName: null,
    address1: "your moms",
    sellerName: null,
  });
});
