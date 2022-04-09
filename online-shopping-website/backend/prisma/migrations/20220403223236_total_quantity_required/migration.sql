/*
  Warnings:

  - Made the column `totalQuantity` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "totalQuantity" SET NOT NULL;
