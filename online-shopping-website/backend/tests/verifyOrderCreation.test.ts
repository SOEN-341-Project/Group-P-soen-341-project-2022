import hasRequiredOrderCreationParams from "../src/helpers/verifyOrderCreation";

const data = [405, [543, 234, 4567, 3456, 9845], [555, 555, 420, 420, 4567], 5420.1287];
let requestBody: any = { userId: 405, itemIds: [543, 234, 4567, 3456, 9845], itemQuantities: [555, 555, 420, 420], totalPrice: 5420.1287};

describe("Required User Creation Params Tests", () => {
    //all inputs are valid
    test("Valid Inputs", () => {
        requestBody.userId = data[0];
        requestBody.itemIds = data[1];
        requestBody.itemQuantities = data[2];
        requestBody.totalPrice = data[3];
        expect(hasRequiredOrderCreationParams(requestBody)).toEqual(true);
    });

    //userId input is invalid
    test("Invalid input userId", () => {
        requestBody.userId = 0;
        requestBody.itemIds = data[1];
        requestBody.itemQuantities = data[2];
        requestBody.totalPrice = data[3];
        expect(hasRequiredOrderCreationParams(requestBody)).toEqual(false);
    });

    //itemIds input is invalid
    test("Invalid input itemIds", () => {
        requestBody.userId = data[0];
        requestBody.itemIds = [234, 234, 234, -435, 466];
        requestBody.itemQuantities = data[2];
        requestBody.totalPrice = data[3];
        expect(hasRequiredOrderCreationParams(requestBody)).toEqual(false);
    });

    //itemQuantities input is invalid
    test("Invalid input itemQuantities", () => {
        requestBody.userId = data[0];
        requestBody.itemIds = data[1];
        requestBody.itemQuantities = [234, 234, 234, -435, 466];
        requestBody.totalPrice = data[3];
        expect(hasRequiredOrderCreationParams(requestBody)).toEqual(false);
    });

    //totalPrice input is invalid
    test("Invalid input totalPrice", () => {
        requestBody.userId = data[0];
        requestBody.itemIds = data[1];
        requestBody.itemQuantities = data[2];
        requestBody.totalPrice = 0;
        expect(hasRequiredOrderCreationParams(requestBody)).toEqual(false);
    });
});