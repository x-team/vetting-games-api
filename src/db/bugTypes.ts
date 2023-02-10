import { Prisma } from "@prisma/client";

export const bugTypes: Prisma.BugTypeCreateInput[] = [
  {
    name: "logic",
    description:
      "It is working, but not as expected, maybe a missing condition?",
  },
  {
    name: "syntax",
    description: "Have you tried adding a semicolon?",
  },
  {
    name: "runtime",
    description: "It will break at runtime, but when and why?",
  },
  {
    name: "memory",
    description: "It's using too much memory, it will explode!",
  },
  {
    name: "feature",
    description: "The feature is there, but one step is missing.",
  },
  {
    name: "performance",
    description: "It's sloweeer than a snail, it needs to be more efficient!",
  },
];
