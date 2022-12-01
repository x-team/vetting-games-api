import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.mission.upsert({
    where: { type_level: { type: "js", level: 1 } },
    update: {},
    create: {
      title: "Mission 1",
      level: 1,
      description: "This is the first mission",
      type: "js",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
