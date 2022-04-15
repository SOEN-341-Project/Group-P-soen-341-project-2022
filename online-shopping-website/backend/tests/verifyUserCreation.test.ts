import hasRequiredUserCreationParams from "../src/helpers/verifyUserCreation";
import { Request } from "express";

const data = ["email", "password", "address1", "admin"];
const requestBody: any = { email: "email", password: "password", address1: "address1", role: "admin" };

describe("Required User Creation Params Tests", () => {
  test("No email", () => {
    requestBody.email = undefined;
    requestBody.password = data[1];
    requestBody.address1 = data[2];
    requestBody.role = data[3];

    expect(hasRequiredUserCreationParams(requestBody)).toEqual(false);
  });

  test("No Password", () => {
    requestBody.email = data[0];
    requestBody.password = undefined;
    requestBody.address1 = data[2];
    requestBody.role = data[3];

    expect(hasRequiredUserCreationParams(requestBody)).toEqual(false);
  });

  test("No Address", () => {
    requestBody.email = data[0];
    requestBody.password = data[1];
    requestBody.address1 = undefined;
    requestBody.role = data[3];

    expect(hasRequiredUserCreationParams(requestBody)).toEqual(false);
  });

  test("No Role", () => {
    requestBody.email = data[0];
    requestBody.password = data[1];
    requestBody.address1 = data[2];
    requestBody.role = undefined;

    expect(hasRequiredUserCreationParams(requestBody)).toEqual(false);
  });

  test("Incorrect Role", () => {
    requestBody.email = data[0];
    requestBody.password = data[1];
    requestBody.address1 = data[2];
    requestBody.role = "Not a role";

    expect(hasRequiredUserCreationParams(requestBody)).toEqual(false);
  });

  test("Valid Input", () => {
    requestBody.email = data[0];
    requestBody.password = data[1];
    requestBody.address1 = data[2];
    requestBody.role = data[3];

    expect(hasRequiredUserCreationParams(requestBody)).toEqual(true);
  });
});
