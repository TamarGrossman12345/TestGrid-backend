import express from "express";
import prisma from "../db.js";
import {
  createFolder,
  deleteFolder,
} from "../controllers/testFolders.controller.js";
const router = express.Router();

router.post("/create-folder", createFolder);
router.delete("/delete-folder/:id/", deleteFolder);

export default router;
