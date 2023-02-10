import { createMission } from "@modules/mission/model";
import { prisma } from "@prisma";
import { bugTypes } from "./bugTypes";
import { missions } from "./missions";

export async function baseSeed() {
  await prisma.bugType.createMany({
    skipDuplicates: true,
    data: bugTypes,
  });

  for (const mission of missions) {
    await createMission(mission, bugTypes);
  }
}
