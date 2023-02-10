import { generateBugFileName } from "@modules/file/utils";
import { prisma } from "@prisma";
import { Bug, BugFile, BugType, File, Mission, Prisma } from "@prisma/client";

export interface BugFileData {
  lineStart: number;
  lineEnd: number;
}

export interface BugData {
  bugType: string;
  files: BugFileData[];
}

export async function createBugs(
  mission: Mission,
  file: File,
  type: string,
  fileFolder: string,
  bugsData: BugData[]
) {
  const bugsByType = bugsData.reduce((acc, bugData) => {
    return {
      ...acc,
      [bugData.bugType]: [...(acc[bugData.bugType] || []), bugData],
    };
  }, {} as Record<string, BugData[]>);

  let bugs: Bug[] = [];

  for (const bugTypeName in bugsByType) {
    const bugType = await prisma.bugType.findUnique({
      where: { name: bugTypeName },
    });

    if (!bugType) {
      throw new Error(`Bug type ${bugTypeName} not found`);
    }

    const newBugs = await Promise.all(
      bugsByType[bugTypeName].map((bugData, index) => {
        return createBug(
          mission,
          file,
          type,
          fileFolder,
          bugType,
          index,
          bugData.files
        );
      })
    );

    bugs = [...bugs, ...newBugs];
  }

  return bugs;
}

export async function createBug(
  mission: Mission,
  file: File,
  type: string,
  fileFolder: string,
  bugType: BugType,
  index: number,
  bugFilesData: BugFileData[]
) {
  const bugName = `${bugType.name}-${index + 1}-${file.name}`;
  const data: Prisma.BugCreateInput = {
    name: bugName,
    mission: { connect: { id: mission.id } },
    bugType: { connect: { id: bugType.id } },
    file: { connect: { id: file.id } },
  };

  const bug = await prisma.bug.upsert({
    where: {
      missionId_bugTypeId_name: {
        missionId: mission.id,
        bugTypeId: bugType.id,
        name: bugName,
      },
    } satisfies Prisma.BugWhereUniqueInput,
    update: data,
    create: data,
    include: {
      bugFiles: true,
    },
  });

  const bugFiles = await createBugFiles(
    bug,
    index,
    bugFilesData,
    bugType,
    type,
    fileFolder
  );
  await updateBugFiles(bug, bugFiles);

  return bug;
}

export async function updateBugFiles(
  bug: Bug & { bugFiles: BugFile[] },
  bugFiles: BugFile[]
) {
  const removedFiles = bug.bugFiles.filter(
    (bugFile) =>
      !bugFiles.some(
        (file) => file.bugId === bugFile.bugId && file.fileId === bugFile.fileId
      )
  );

  if (removedFiles.length > 0) {
    await prisma.file.deleteMany({
      where: {
        id: {
          in: removedFiles.map((bugFile) => bugFile.fileId),
        },
      } satisfies Prisma.FileWhereInput,
    });
  }

  await prisma.bug.update({
    where: { id: bug.id },
    data: {
      bugFiles: {
        connect: bugFiles.map((file) => ({
          fileId: file.fileId,
        })),
      },
    } satisfies Prisma.BugUpdateInput,
  });
}

export async function createBugFiles(
  bug: Bug,
  bugIndex: number,
  bugFilesData: BugFileData[],
  bugType: BugType,
  type: string,
  fileFolder: string
) {
  const bugFiles: BugFile[] = [];
  for (let i = 0; i < bugFilesData.length; i++) {
    const bugFileData = bugFilesData[i];

    const name = generateBugFileName(bugIndex, bugType.name, i, type);
    const path = `${fileFolder}/${name}`;
    const fileCreateData: Prisma.FileCreateInput = {
      name,
      path,
    };

    const file = await prisma.file.upsert({
      where: {
        path,
      },
      update: fileCreateData,
      create: fileCreateData,
      include: {
        bugFile: true,
      },
    });

    const data: Prisma.BugFileUncheckedCreateInput = {
      lineStart: bugFileData.lineStart,
      lineEnd: bugFileData.lineEnd,
      bugId: bug.id,
      fileId: file.id,
    };

    const bugFile = await prisma.bugFile.upsert({
      where: { fileId: file.id },
      update: data,
      create: data,
    });

    bugFiles.push(bugFile);
  }

  return bugFiles;
}
