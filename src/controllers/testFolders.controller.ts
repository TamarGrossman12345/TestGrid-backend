import type { Request, Response } from "express";
import {
  createNewFolder,
  deleteFolderById,
  getFoldersByProjectId,
} from "../services/testFolder.service.js";

export const createFolder = async (req: Request, res: Response) => {
  try {
    const { name, description, projectId } = req.body;
    const newFolder = await createNewFolder(name, description, projectId);
    res.status(201).json({ message: "File created successfully", newFolder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create folder" });
  }
};

export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deletedFile = await deleteFolderById(id);

    res.json({ message: "File deleted successfully", deletedFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete folder" });
  }
};

export const getFolders = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    const folders = await getFoldersByProjectId(id);
    res.json(folders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not get folders" });
  }
};
