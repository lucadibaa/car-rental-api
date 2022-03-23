/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Car_slug_key" ON "Car"("slug");
