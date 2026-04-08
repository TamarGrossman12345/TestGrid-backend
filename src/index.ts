import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./db.js";

// טעינת משתני סביבה מקובץ .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // מאפשר לפרונטנד שלך (שיושב על פורט אחר) לדבר עם השרת
app.use(express.json()); // מאפשר לשרת לקרוא JSON שנשלח ב-Body של בקשות POST

// נתיב בדיקה בסיסי (Route)
app.get("/", (req: Request, res: Response) => {
  res.send("TestGrid API is running successfully! 🚀");
});

// נתיב ליצירת פרויקט חדש
app.post("/projects", async (req, res) => {
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

app.get("/projects", async (req, res) => {
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

app.delete("/projects/:id/", async (req, res) => {
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

app.post("/files", async (req, res) => {
  try {
    const { name, description, projectId } = req.body;

    const newFile = await prisma.testFile.create({
      data: {
        name,
        description,
        projectId, 
      },
    });

    res.status(201).json({ message: "File created successfully", newFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create file" });
  }
});

app.delete("/files/:id/", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedFile = await prisma.testFile.delete({
      where: { TestFileId: id },
    });

    res.json({ message: "File deleted successfully", deletedFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete file" });
  }
});

app.get("/testCase/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;

    const testCases = await prisma.testCase.findMany({
      where: { fileId: fileId },
    });

    res.json(testCases);
  } catch (error) {
    console.error("Error fetching test cases:", error);
    res.status(500).json({ error: "Could not fetch test cases" });
  }
});


app.post('/testCases/newTestCase/:fileId', async (req, res) => {
  const { fileId } = req.params;
  const { title, testSteps, expectedResults, status } = req.body;

  try {
    const newTestCase = await prisma.testCase.create({
      data: {
        title,
        testSteps,
        expectedResults,
        status,
        fileId 
      },
    });
    res.status(201).json(newTestCase);
  } catch (error: any) {
    res.status(500).json({ error: "failed to create test case", details: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`-----------------------------------------`);
  console.log(`Server is running on: http://localhost:${PORT}`);
  console.log(`-----------------------------------------`);
});


