import { MissionData } from "@modules/mission/model";

export const missions: MissionData[] = [
  {
    title: "Javascript",
    description:
      "There is a problem with the current website. As you can see the names have been swapped by some interns and we need to update it right away.\n\n\nIs it something that you think you can do, or should I instead ask Jeff to do it for us?",
    type: "js",
    level: 1,
    releaseDate: new Date("2021-01-01"),
    files: [
      {
        name: "createTimeTracking",
        type: "js",
        bugs: [
          {
            bugType: "logic",
            files: [
              {
                lineStart: 28,
                lineEnd: 31,
              },
            ],
          },
          {
            bugType: "logic",
            files: [
              {
                lineStart: 29,
                lineEnd: 29,
              },
            ],
          },
          {
            bugType: "syntax",
            files: [
              {
                lineStart: 1,
                lineEnd: 1,
              },
            ],
          },
          {
            bugType: "runtime",
            files: [
              {
                lineStart: 3,
                lineEnd: 3,
              },
            ],
          },
        ],
      },
      {
        name: "useTimeTracking",
        type: "js",
        bugs: [
          {
            bugType: "logic",
            files: [
              {
                lineStart: 18,
                lineEnd: 38,
              },
            ],
          },
          {
            bugType: "performance",
            files: [
              {
                lineStart: 34,
                lineEnd: 40,
              },
              {
                lineStart: 52,
                lineEnd: 52,
              },
              {
                lineStart: 58,
                lineEnd: 61,
              },
            ],
          },
          {
            bugType: "syntax",
            files: [
              {
                lineStart: 18,
                lineEnd: 18,
              },
            ],
          },
          {
            bugType: "feature",
            files: [
              {
                lineStart: 6,
                lineEnd: 16,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Javascript",
    description: "",
    type: "js",
    level: 2,
    releaseDate: new Date("2025-01-01"),
    files: [],
  },
  {
    title: "Javascript",
    description: "",
    type: "js",
    level: 3,
    releaseDate: new Date("2025-01-01"),
    files: [],
  },
];
