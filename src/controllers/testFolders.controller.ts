import express from "express";
import type { Request, Response } from "express";
import {
  createNewFolder,
  deleteFolderById,
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
