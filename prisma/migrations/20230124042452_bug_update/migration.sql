/*
  Warnings:

  - You are about to drop the `MissionSourceCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MissionSourceCode" DROP CONSTRAINT "MissionSourceCode_missionId_fkey";

-- DropTable
DROP TABLE "MissionSourceCode";

-- CreateTable
CREATE TABLE "MissionFile" (
    "missionId" INTEGER NOT NULL,
    "fileId" UUID NOT NULL,

    CONSTRAINT "MissionFile_pkey" PRIMARY KEY ("missionId","fileId")
);

-- CreateTable
CREATE TABLE "BugType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "BugType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bug" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bugTypeId" INTEGER NOT NULL,
    "missionId" INTEGER NOT NULL,
    "fileId" UUID NOT NULL,

    CONSTRAINT "Bug_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BugFile" (
    "bugId" INTEGER NOT NULL,
    "fileId" UUID NOT NULL,
    "lineStart" INTEGER NOT NULL,
    "lineEnd" INTEGER NOT NULL,

    CONSTRAINT "BugFile_pkey" PRIMARY KEY ("bugId","fileId")
);

-- CreateTable
CREATE TABLE "File" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PickedBug" (
    "gameId" UUID NOT NULL,
    "bugTypeId" INTEGER NOT NULL,

    CONSTRAINT "PickedBug_pkey" PRIMARY KEY ("gameId","bugTypeId")
);

-- CreateTable
CREATE TABLE "GameBug" (
    "gameId" UUID NOT NULL,
    "bugTypeId" INTEGER NOT NULL,
    "bugId" INTEGER NOT NULL,

    CONSTRAINT "GameBug_pkey" PRIMARY KEY ("gameId","bugTypeId")
);

-- CreateTable
CREATE TABLE "_BugTypeToMission" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MissionFile_fileId_key" ON "MissionFile"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "BugType_name_key" ON "BugType"("name");

-- CreateIndex
CREATE INDEX "Bug_missionId_idx" ON "Bug"("missionId");

-- CreateIndex
CREATE INDEX "Bug_missionId_bugTypeId_idx" ON "Bug"("missionId", "bugTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "Bug_missionId_bugTypeId_name_key" ON "Bug"("missionId", "bugTypeId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "BugFile_fileId_key" ON "BugFile"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "File_path_key" ON "File"("path");

-- CreateIndex
CREATE UNIQUE INDEX "_BugTypeToMission_AB_unique" ON "_BugTypeToMission"("A", "B");

-- CreateIndex
CREATE INDEX "_BugTypeToMission_B_index" ON "_BugTypeToMission"("B");

-- AddForeignKey
ALTER TABLE "MissionFile" ADD CONSTRAINT "MissionFile_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissionFile" ADD CONSTRAINT "MissionFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bug" ADD CONSTRAINT "Bug_bugTypeId_fkey" FOREIGN KEY ("bugTypeId") REFERENCES "BugType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bug" ADD CONSTRAINT "Bug_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bug" ADD CONSTRAINT "Bug_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BugFile" ADD CONSTRAINT "BugFile_bugId_fkey" FOREIGN KEY ("bugId") REFERENCES "Bug"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BugFile" ADD CONSTRAINT "BugFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickedBug" ADD CONSTRAINT "PickedBug_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickedBug" ADD CONSTRAINT "PickedBug_bugTypeId_fkey" FOREIGN KEY ("bugTypeId") REFERENCES "BugType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameBug" ADD CONSTRAINT "GameBug_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameBug" ADD CONSTRAINT "GameBug_bugTypeId_fkey" FOREIGN KEY ("bugTypeId") REFERENCES "BugType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameBug" ADD CONSTRAINT "GameBug_bugId_fkey" FOREIGN KEY ("bugId") REFERENCES "Bug"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BugTypeToMission" ADD CONSTRAINT "_BugTypeToMission_A_fkey" FOREIGN KEY ("A") REFERENCES "BugType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BugTypeToMission" ADD CONSTRAINT "_BugTypeToMission_B_fkey" FOREIGN KEY ("B") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
