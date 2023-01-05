-- CreateTable
CREATE TABLE "Settings" (
    "id" UUID NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSettings" (
    "id" UUID NOT NULL,
    "showTutorial" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "GameSettings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSettings" ADD CONSTRAINT "GameSettings_id_fkey" FOREIGN KEY ("id") REFERENCES "Settings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
