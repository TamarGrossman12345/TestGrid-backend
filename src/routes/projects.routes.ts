import express from "express";
import prisma from "../db.js";
import {
  createProject,
  getAllProjects,
  deleteProject,
} from "../controllers/project.controller.js";
import { get } from "node:http";
const router = express.Router();

router.post("/create-project", createProject);
router.get("/get-all-projects", getAllProjects);
router.delete("/delete-project/:id/", deleteProject);

export default router;
