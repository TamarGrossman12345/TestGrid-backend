import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './db.js';

// טעינת משתני סביבה מקובץ .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // מאפשר לפרונטנד שלך (שיושב על פורט אחר) לדבר עם השרת
app.use(express.json()); // מאפשר לשרת לקרוא JSON שנשלח ב-Body של בקשות POST

// נתיב בדיקה בסיסי (Route)
app.get('/', (req: Request, res: Response) => {
  res.send('TestGrid API is running successfully! 🚀');
});

// נתיב ליצירת פרויקט חדש
app.post('/projects', async (req, res) => {
  try {
    const { projectName, description } = req.body;

    const newProject = await prisma.project.create({
      data: {
        projectName,
        description,
      },
    });

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
    console.error(error);
  }
});

// נתיב לקבלת כל הפרויקטים
app.get('/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch projects" });
  }
});



app.listen(PORT, () => {
  console.log(`-----------------------------------------`);
  console.log(`Server is running on: http://localhost:${PORT}`);
  console.log(`-----------------------------------------`);
});