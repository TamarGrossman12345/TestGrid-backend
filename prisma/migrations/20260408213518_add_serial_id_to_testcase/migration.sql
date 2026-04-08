/*
  Warnings:

  - A unique constraint covering the columns `[serialId]` on the table `TestCase` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TestCase" ADD COLUMN "serialId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "TestCase_serialId_key" ON "TestCase"("serialId");
