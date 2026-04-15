import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import prisma from "./db.js";
import projectRouter from "./routes/projects.routes.js";
import folderRouter from "./routes/testFolders.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // מאפשר לפרונטנד שלך (שיושב על פורט אחר) לדבר עם השרת
app.use(express.json()); // מאפשר לשרת לקרוא JSON שנשלח ב-Body של בקשות POST


app.use("/api/projects", projectRouter);
app.use("/api/folders", folderRouter);


// נתיב בדיקה בסיסי (Route)
app.get("/", (req: Request, res: Response) => {
  res.send("TestGrid API is running successfully! 🚀");
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

app.post("/testCases/newTestCase/:fileId", async (req, res) => {
  const { fileId } = req.params;
  const { title, testSteps, expectedResults, status } = req.body;

  try {
    const lastTestCase = await prisma.testCase.findFirst({
      where: {
        serialId: { not: null },
      },
      orderBy: { serialId: "desc" },
      select: { serialId: true },
    });

    const nextSerialId = (lastTestCase?.serialId ?? 0) + 1;

    const newTestCase = await prisma.testCase.create({
      data: {
        title,
        testSteps,
        expectedResults,
        status,
        fileId,
        serialId: nextSerialId,
      },
    });

    res.status(201).json(newTestCase);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "failed to create test case", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`-----------------------------------------`);
  console.log(`Server is running on: http://localhost:${PORT}`);
  console.log(`-----------------------------------------`);
});
