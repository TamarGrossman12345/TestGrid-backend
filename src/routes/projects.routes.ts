import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import prisma from "../db.js";
const router = express.Router();

// נתיב ליצירת פרויקט חדש
router.post("/create-project", async (req, res) => {
  try {
    const { projectName, description, isPrivate } = req.body;
    const project = await prisma.project.create({
      data: { projectName, description, isPrivate },
    });
    res.json({ message: "Project created successfully", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

router.get("/get-all-projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        files: true, // פריזמה אוטומטית תצרף לכל פרויקט את רשימת הקבצים שלו
      },
    });
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch projects" });
  }
});

router.delete("/delete-project/:id/", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProject = await prisma.project.delete({
      where: { projectId: id },
    });

    res.json({ message: "Project deleted successfully", deletedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete project" });
  }
});

export default router;