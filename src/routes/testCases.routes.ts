import express from "express";
import prisma from "../db.js";
const router = express.Router();

router.get("/get-testCases/:fileId", async (req, res) => {
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

router.post("/create-newTestCase/:fileId", async (req, res) => {
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
export default router;
