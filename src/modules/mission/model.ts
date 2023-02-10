import { BugData, createBugs } from "@modules/bug/model";
import {
  generateFolderFile,
  generateMissionFileName,
} from "@modules/file/utils";
import { prisma } from "@prisma";
import { File, Mission, MissionFile, Prisma } from "@prisma/client";

export interface FileData {
  name: string;
  type: string;
  bugs: BugData[];
}

export interface MissionData {
  title: string;
  description: string;
  type: string;
  level: number;
  files: FileData[];
  releaseDate: Date;
}

export async function createMission(
  missionData: MissionData,
  bugTypes: Prisma.BugTypeCreateInput[]
) {
  const { type, level } = missionData;
  const data: Prisma.MissionCreateInput = {
    title: missionData.title,
    description: missionData.description,
    type: missionData.type,
    level: missionData.level,
    releaseDate: missionData.releaseDate,
    bugTypes: {
      connect: bugTypes.map((bugType) => ({ name: bugType.name })),
    },
  };

  const mission = await prisma.mission.upsert({
    where: { type_level: { type, level } },
    update: data,
    create: data,
    include: {
      missionFiles: true,
    },
  });

  const files = await createFiles(mission, missionData.files);
  await updateMissionFiles(mission, files);
}

async function updateMissionFiles(
  mission: Mission & { missionFiles: MissionFile[] },
  files: File[]
) {
  const removedFiles = mission.missionFiles.filter(
    (missionFile) => !files.some((file) => file.id === missionFile.fileId)
  );

  if (removedFiles.length > 0) {
    await prisma.file.deleteMany({
      where: {
        id: {
          in: removedFiles.map((removedFile) => removedFile.fileId),
        },
      } satisfies Prisma.FileWhereInput,
    });
  }

  await prisma.mission.update({
    where: { id: mission.id },
    data: {
      missionFiles: {
        connectOrCreate: files.map((file) => ({
          where: {
            missionId_fileId: { missionId: mission.id, fileId: file.id },
          },
          create: { file: { connect: { id: file.id } } },
        })),
      },
    } as Prisma.MissionUpdateInput,
  });
}

async function createFiles(mission: Mission, filesData: FileData[]) {
  const files: File[] = [];

  for (const fileData of filesData) {
    const fileFolder = generateFolderFile(
      mission.type,
      mission.level,
      fileData.name
    );
    const fileName = generateMissionFileName(fileData.name, fileData.type);
    const path = `${fileFolder}/${fileName}`;
    const data: Prisma.FileCreateInput = {
      name: fileName,
      path,
    };

    const file = await prisma.file.upsert({
      where: { path },
      update: data,
      create: data,
      include: {
        bugs: true,
      },
    });

    const bugs = await createBugs(
      mission,
      file,
      fileData.type,
      fileFolder,
      fileData.bugs
    );

    const removedBugs = file.bugs.filter(
      (bug) => !bugs.some((newBug) => newBug.id === bug.id)
    );

    if (removedBugs.length > 0) {
      await prisma.bug.deleteMany({
        where: {
          id: {
            in: removedBugs.map((removedBug) => removedBug.id),
          },
        },
      });
    }

    files.push({ ...file });
  }

  return files;
}
