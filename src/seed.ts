import { prisma } from "@prisma";
import { baseSeed } from "@db/baseSeed";

async function main() {
  await prisma.$connect();

  await baseSeed();
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
