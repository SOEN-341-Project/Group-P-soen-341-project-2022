-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "totalQuantity" SET DEFAULT 0;
