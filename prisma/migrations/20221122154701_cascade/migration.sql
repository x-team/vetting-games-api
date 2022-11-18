-- DropForeignKey
ALTER TABLE "Bug" DROP CONSTRAINT "Bug_missionId_fkey";

-- DropForeignKey
ALTER TABLE "BugOnGame" DROP CONSTRAINT "BugOnGame_bugId_fkey";

-- DropForeignKey
ALTER TABLE "BugOnGame" DROP CONSTRAINT "BugOnGame_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_missionId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_userId_fkey";

-- DropForeignKey
ALTER TABLE "SocialLogin" DROP CONSTRAINT "SocialLogin_userId_fkey";

-- AddForeignKey
ALTER TABLE "SocialLogin" ADD CONSTRAINT "SocialLogin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bug" ADD CONSTRAINT "Bug_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BugOnGame" ADD CONSTRAINT "BugOnGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BugOnGame" ADD CONSTRAINT "BugOnGame_bugId_fkey" FOREIGN KEY ("bugId") REFERENCES "Bug"("id") ON DELETE CASCADE ON UPDATE CASCADE;
