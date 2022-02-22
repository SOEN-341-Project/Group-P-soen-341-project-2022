/*
  Warnings:

  - Made the column `address1` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "address1" SET NOT NULL;
