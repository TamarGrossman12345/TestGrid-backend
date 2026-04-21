import express from "express";
import prisma from "../db.js";
import {
  createFolder,
  deleteFolder,
  getFolders,
} from "../controllers/testFolders.controller.js";
const router = express.Router();

router.post("/create-folder", createFolder);
router.delete("/delete-folder/:id/", deleteFolder);
router.get("/get-folders/:projectId", getFolders)

export default router;
