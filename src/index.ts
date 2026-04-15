import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import prisma from "./db.js";
import projectRouter from "./routes/projects.routes.js";
import folderRouter from "./routes/testFolders.routes.js";
import testCaseRouter from "./routes/testCases.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // מאפשר לפרונטנד  (שיושב על פורט אחר) לדבר עם השרת
app.use(express.json()); // מאפשר לשרת לקרוא JSON שנשלח ב-Body של בקשות POST

app.use("/api/projects", projectRouter);
app.use("/api/folders", folderRouter);
app.use("/api/testCases", testCaseRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("TestGrid API is running successfully! 🚀");
});

app.listen(PORT, () => {
  console.log(`-----------------------------------------`);
  console.log(`Server is running on: http://localhost:${PORT}`);
  console.log(`-----------------------------------------`);
});
