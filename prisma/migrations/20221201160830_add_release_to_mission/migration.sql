-- AlterTable
ALTER TABLE "Mission" ADD COLUMN     "releaseDate" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Mission_active_type_idx" ON "Mission"("active", "type");
