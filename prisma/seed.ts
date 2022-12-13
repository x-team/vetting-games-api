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
      sourceCode: {
        createMany: {
          data: [
            { src: "createTimeTracking.js" },
            { src: "useTimeTracking.js" },
          ],
        },
      },
      bugs: {
        createMany: {
          data: [
            {
              name: "Incomplete or Missing cleanup",
              description:
                "Incomplete cleanup on the `useTimeTracking`'s `useEffect`. It may trigger unnecessary events.",
            },
            {
              name: "Unresponsiveness due to lack of updates",
              description:
                "Adding `notify` calls into the `createTimeTracking` events may trigger better UI updates.",
            },
            {
              name: "No Events Tracked",
              description: "User inputs are not tracked.",
              realBug: false,
            },
            {
              name: "Wrong checks on activity handlers",
              description:
                "Wrong checks on `awayDebounced` and `handleActivity`. It may trigger or miss a change between Away and Active tracks.",
              realBug: false,
            },
            {
              name: "Unresponsiveness to issues with the listeners",
              description:
                "Inadequate management of listeners results in fewer UI updates and a poor user experience.",
              realBug: false,
            },
            {
              name: "Missing clear interval on stop",
              description:
                "The code is not executing a clear interval which results in many timers running simultaneously.",
              realBug: false,
            },
          ],
        },
      },
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
