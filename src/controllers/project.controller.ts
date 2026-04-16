import express from "express";
import type { Request, Response } from "express";
import {
  createNewProject,
  getProjects,
  deleteProjectById,
} from "../services/project.service.js";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { projectName, description, isPrivate } = req.body;
    const project = await createNewProject(projectName, description, isPrivate);
    res.json({ message: "Project created successfully", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await getProjects();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch projects" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deletedProject = await deleteProjectById(id);

    res.json({ message: "Project deleted successfully", deletedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete project" });
  }
};
