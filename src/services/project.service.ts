import prisma from "../db.js";

export const createNewProject = async (
  projectName: string,
  description: string,
  isPrivate: boolean,
) => {
  const project = await prisma.project.create({
    data: { projectName, description, isPrivate },
  });

  return project;
};

export const getProjects = async () => {
  const projects = await prisma.project.findMany({
    include: {
      files: true, // פריזמה אוטומטית תצרף לכל פרויקט את רשימת הקבצים שלו
    },
  });
  return projects;
};

export const deleteProjectById = async (id: string) => {
  const deletedProject = await prisma.project.delete({
    where: { projectId: id },
  });

  return deletedProject;
};
