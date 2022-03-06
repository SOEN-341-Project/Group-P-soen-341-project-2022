# How to use the backend API

So, you want to use the backend, huh? <br>
It's pretty easy if you use this handy dandy reference guide!

Accessing the backend needs one crucial thing and another one is sometimes needed, [**request methods**](#request-methods) and **authorization** (not built in yet)

## Table of Contents

- [How to use the backend API](#how-to-use-the-backend-api)
  - [Table of Contents](#table-of-contents)
  - [Request Methods](#request-methods)
    - [Get Requests:](#get-requests)
    - [Delete Requests:](#delete-requests)
    - [Post Requests:](#post-requests)
  - [Routes](#routes)
    - [Test Routes](#test-routes)
    - [User Routes `/api/users`](#user-routes-apiusers)
    - [Item Routes `/api/items`](#item-routes-apiitems)
    - [Brand Routes `/api/brands`](#brand-routes-apibrands)
    - [Order Routes `/api/orders`](#order-routes-apiorders)

## Request Methods

There are 3 methods that this backend supports:

- [`GET`](#get-requests)
- [`DELETE`](#delete-requests)
- [`POST`](#post-requests)

### Get Requests:

Get requests are the pretty simple, they are only used when you are only interested in getting data and not sending anything else except for parameters. These are mostly going to be used with search routes such as `/all` or `/find`

### Delete Requests:

Delete requests are the simplest requests as they are only used when you want to delete something. These are most likely to be used with authorization and they'll only be used with the `/delete` route

### Post Requests:

Post requests are the most complex requests as they are the ones that are used when you want to send data to the server. These will be the main request method for creating and updating anything.

## Routes

### Test Routes

Test routes are only there for you to test if the api is working properly

- #### Route: `/get`

  - Method: GET
  - Requires: nothing
  - Optional: Any parameters and any body

- #### Route: `/post`

  - Method: POST
  - Requires: nothing
  - Optional: Any parameters and any body

- #### Route: `/delete`
  - Method: DELETE
  - Requires: nothing
  - Optional: Any parameters and any body

### User Routes `/api/users`

- #### Route: `/register`

  - Method: POST
  - Requires:
    - Body:
      - | Key        | Value                          |
        | ---------- | ------------------------------ |
        | `email`    | The user's email               |
        | `password` | The plain password of the user |
        | `role`     | The user's role                |
        | `address1` | The user's address             |
  - Optional:
    - Body
      - | Key          | Value                     |
        | ------------ | ------------------------- |
        | `username`   | The user's username       |
        | `firstname`  | The user's first name     |
        | `lastname`   | The user's last name      |
        | `sellername` | The seller's display name |
  - Returns: User object

- #### Route: `/signin`
  - Method: POST
  - Requires:
    - Body:
      - | Key        | Value                          |
        | ---------- | ------------------------------ |
        | `email`    | The user's email               |
        | `password` | The plain password of the user |
  - Optional: None
  - Returns: A success or failure message (for now)
- #### Route: `/update`
  - Method: POST
  - Requires:
    - Body:
      - | Key  | Value         |
        | ---- | ------------- |
        | `id` | The user's id |
  - Optional:
    - Body:
      - | Key          | Value                          |
        | ------------ | ------------------------------ |
        | `email`      | The user's email               |
        | `password`   | The plain password of the user |
        | `address1`   | The user's address             |
        | `username`   | The user's username            |
        | `firstname`  | The user's first name          |
        | `lastname`   | The user's last name           |
        | `sellername` | The seller's display name      |
  - Returns: Updated User object
- #### Route: `/all`
  - Method: GET
  - Requires: None
  - Optional: None
  - Returns: All users

### Item Routes `/api/items`

- #### Route: `/create`
  - Method: POST
  - Requires:
    - Body:
      - | Key           | Value                                          |
        | ------------- | ---------------------------------------------- |
        | `name`        | The item's name                                |
        | `price`       | The item's price                               |
        | `description` | The item's description                         |
        | `picture`     | The seller's display name                      |
        | `brandId`     | The ID of the brand associated with this item  |
        | `sellerId`    | The ID of the seller associated with this item |
  - Optional:
    - Body:
      - | Key             | Value                                                      |
        | --------------- | ---------------------------------------------------------- |
        | `salePrice`     | If the item has a salePrice, it is on sale with this price |
        | `totalQuantity` | The quantity of that item in stock                         |
        | `promoted`      | If the item is promoted (default: false)                   |
  - Returns: New Item
- #### Route: `/delete`

  - Method: DELETE
  - Requires:

    - Parameters:
      - | Key  | Value         |
        | ---- | ------------- |
        | `id` | The item's id |

  - Optional: None
  - Returns: Deleted Item

- #### Route: `/update`
  - Method: POST
  - Requires:
    - Body:
      - | Key  | Value         |
        | ---- | ------------- |
        | `id` | The item's id |
  - Optional:
    - Body:
      - | Key             | Value                                                      |
        | --------------- | ---------------------------------------------------------- |
        | `name`          | The item's name                                            |
        | `price`         | The item's price                                           |
        | `description`   | The item's description                                     |
        | `picture`       | The picture associated with the item (file)                |
        | `brandId`       | The ID of the brand associated with this item              |
        | `sellerId`      | The ID of the seller associated with this item             |
        | `salePrice`     | If the item has a salePrice, it is on sale with this price |
        | `totalQuantity` | The quantity of that item in stock                         |
        | `promoted`      | If the item is promoted (default: false)                   |
  - Returns: Updated Item
- #### Route: `/find`
  - Method: GET
  - Requires: None
  - Optional:
    - Parameters
      - | Key      | Value                                        |
        | -------- | -------------------------------------------- |
        | `name`   | The name of the item (can be a partial name) |
        | `seller` | The ID of the seller                         |
        | `brand`  | The ID of the brand                          |
  - Returns: Items that conform to the specified search parameters
- #### Route: `/all`
  - Method: GET
  - Requires: None
  - Optional: None
  - Returns: All Items

### Brand Routes `/api/brands`

- #### Route: `/create`

  - Method: POST
  - Requires:
    - Body:
      - | Key           | Value                        |
        | ------------- | ---------------------------- |
        | `name`        | The name of the brand        |
        | `description` | The description of the brand |
  - Optional:

    - Body:
      - | Key       | Value                          |
        | --------- | ------------------------------ |
        | `picture` | The picture of the item (file) |

  - Returns: New Brand

- #### Route: `/delete`
  - Method: DELETE
  - Requires:
    - Parameters:
      - | Key  | Value         |
        | ---- | ------------- |
        | `id` | The item's id |
  - Optional: None
  - Returns: Deleted Brand
- #### Route: `/update`
  - Method: POST
  - Requires:
    - Body:
      - | Key  | Value          |
        | ---- | -------------- |
        | `id` | The brand's id |
  - Optional:
    - Body:
      - | Key           | Value                          |
        | ------------- | ------------------------------ |
        | `name`        | The name of the brand          |
        | `description` | The description of the brand   |
        | `picture`     | The picture of the item (file) |
  - Returns: Updated Brand
- #### Route: `/find`
  - Method: GET
  - Requires:
    - Parameters:
      - | Key    | Value                                    |
        | ------ | ---------------------------------------- |
        | `name` | The brand's name (can be a partial name) |
  - Optional: None
  - Returns: Brands that conform to the specified search parameter
- #### Route: `/all`
  - Method: GET
  - Requires: None
  - Optional: None
  - Returns: All Brands

### Order Routes `/api/orders`

- #### Route: `/create`
  - Method: POST
  - Requires:
    - Body:
      - | Key              | Value                                                                            |
        | ---------------- | -------------------------------------------------------------------------------- |
        | `userId`         | The ID of the user making the order                                              |
        | `itemIds`        | An array of integers that represent the IDs of all the items in the order        |
        | `itemQuantities` | An array of integers that represent the quantities of all the items in the order |
        | `totalPrice`     | Float that holds the total price of the order                                    |
  - Optional: None
  - Returns: New Order
- #### Route: `/delete`
  - Method: DELETE
  - Requires:
    - Parameters:
      - | Key  | Value          |
        | ---- | -------------- |
        | `id` | The order's id |
  - Optional: None
  - Returns: Deleted Order
- #### Route: `/update`
  - Method: POST
  - Requires:
    - Parameters:
      - | Key  | Value          |
        | ---- | -------------- |
        | `id` | The order's id |
    - Body:
      - | Key              | Value                                                                            |
        | ---------------- | -------------------------------------------------------------------------------- |
        | `itemIds`        | An array of integers that represent the IDs of all the items in the order        |
        | `itemQuantities` | An array of integers that represent the quantities of all the items in the order |
  - Optional:
    - Body:
      - | Key          | Value                                         |
        | ------------ | --------------------------------------------- |
        | `totalPrice` | Float that holds the total price of the order |
  - Returns: Updated Order
- #### Route: `/find`
  - Method: GET
  - Requires:
    - Parameters:
      - | Key  | Value                                    |
        | ---- | ---------------------------------------- |
        | `id` | The item's id that is being searched for |
  - Optional: None
  - Returns: All orders with that item in it
- #### Route: `/all`
  - Method: GET
  - Requires: None
  - Optional: None
  - Returns: All Orders
