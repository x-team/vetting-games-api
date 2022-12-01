/*
  Warnings:

  - Made the column `startedAt` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "score" DROP NOT NULL,
ALTER COLUMN "startedAt" SET NOT NULL;
