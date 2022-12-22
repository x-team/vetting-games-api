-- CreateTable
CREATE TABLE "Scoreboard" (
    "id" UUID NOT NULL,
    "score" INTEGER NOT NULL,
    "gameId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "missionId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Scoreboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Scoreboard_gameId_key" ON "Scoreboard"("gameId");

-- CreateIndex
CREATE INDEX "Scoreboard_active_missionId_idx" ON "Scoreboard"("active", "missionId");

-- CreateIndex
CREATE INDEX "Scoreboard_active_idx" ON "Scoreboard"("active");

-- CreateIndex
CREATE UNIQUE INDEX "Scoreboard_missionId_userId_key" ON "Scoreboard"("missionId", "userId");

-- AddForeignKey
ALTER TABLE "Scoreboard" ADD CONSTRAINT "Scoreboard_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scoreboard" ADD CONSTRAINT "Scoreboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scoreboard" ADD CONSTRAINT "Scoreboard_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
