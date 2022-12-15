/*
  Warnings:

  - The primary key for the `BugOnGame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `score` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(5,4)`.
  - Changed the type of `gameId` on the `BugOnGame` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BugOnGame" DROP CONSTRAINT "BugOnGame_gameId_fkey";

-- AlterTable
ALTER TABLE "Bug" ALTER COLUMN "realBug" SET DEFAULT true;

-- AlterTable
ALTER TABLE "BugOnGame" DROP CONSTRAINT "BugOnGame_pkey",
DROP COLUMN "gameId",
ADD COLUMN     "gameId" UUID NOT NULL,
ADD CONSTRAINT "BugOnGame_pkey" PRIMARY KEY ("gameId", "bugId");

-- AlterTable
ALTER TABLE "Game" DROP CONSTRAINT "Game_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "score" SET DATA TYPE DECIMAL(5,4),
ADD CONSTRAINT "Game_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "MissionSourceCode" (
    "id" UUID NOT NULL,
    "src" TEXT NOT NULL,
    "missionId" INTEGER NOT NULL,

    CONSTRAINT "MissionSourceCode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MissionSourceCode" ADD CONSTRAINT "MissionSourceCode_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BugOnGame" ADD CONSTRAINT "BugOnGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
