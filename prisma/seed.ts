import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.mission.upsert({
    where: { type_level: { type: "js", level: 1 } },
    update: {},
    create: {
      title: "Javascript",
      level: 1,
      description:
        "There is a problem with the current website. As you can see the names have been swapped by some interns and we need to update it right away.\n\n\nIs it something that you think you can do, or should I instead ask Jeff to do it for us?",
      type: "js",
      releaseDate: new Date("2021-01-01"),
    },
  });
  await prisma.mission.upsert({
    where: { type_level: { type: "js", level: 2 } },
    update: {},
    create: {
      title: "Javascript",
      level: 2,
      description: "",
      type: "js",
    },
  });
  await prisma.mission.upsert({
    where: { type_level: { type: "js", level: 3 } },
    update: {},
    create: {
      title: "Javascript",
      level: 3,
      description: "",
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
