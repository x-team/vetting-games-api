/*
  Warnings:

  - You are about to drop the `Bug` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BugOnGame` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bug" DROP CONSTRAINT "Bug_missionId_fkey";

-- DropForeignKey
ALTER TABLE "BugOnGame" DROP CONSTRAINT "BugOnGame_bugId_fkey";

-- DropForeignKey
ALTER TABLE "BugOnGame" DROP CONSTRAINT "BugOnGame_gameId_fkey";

-- DropTable
DROP TABLE "Bug";

-- DropTable
DROP TABLE "BugOnGame";
