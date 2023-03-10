/*
  Warnings:

  - You are about to drop the column `pizzaId` on the `Ingredient` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_pizzaId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "pizzaId";

-- CreateTable
CREATE TABLE "_IngredientToPizza" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToPizza_AB_unique" ON "_IngredientToPizza"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToPizza_B_index" ON "_IngredientToPizza"("B");

-- AddForeignKey
ALTER TABLE "_IngredientToPizza" ADD CONSTRAINT "_IngredientToPizza_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToPizza" ADD CONSTRAINT "_IngredientToPizza_B_fkey" FOREIGN KEY ("B") REFERENCES "Pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;
