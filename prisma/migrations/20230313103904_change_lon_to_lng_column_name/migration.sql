/*
  Warnings:

  - You are about to drop the column `lon` on the `Pizzeria` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pizzeria" DROP COLUMN "lon",
ADD COLUMN     "lng" DECIMAL(65,30);
