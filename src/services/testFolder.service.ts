import prisma from "../db.js";

export const createNewFolder = async (
  name: string,
  description: string,
  projectId: string,
) => {
  const newFolder = await prisma.testFile.create({
    data: {
      name,
      description,
      projectId,
    },
  });
  return newFolder;
};

export const deleteFolderById = async (id: string) => {
  const deletedFile = await prisma.testFile.delete({
    where: { TestFileId: id },
  });
  return deletedFile;
};

export const getFoldersByProjectId = async (id: string) => {
  const folders = await prisma.testFile.findMany({
    where: { projectId: id },
  });
  return folders;
}
