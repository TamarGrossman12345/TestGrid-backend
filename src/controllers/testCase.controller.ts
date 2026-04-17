import type { Request, Response } from "express";
import {
  createNewTestCase,
  getTestCasesByFolderId,
} from "../services/testCase.service.js";

export const getTestCases = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.params;
    const testCases = await getTestCasesByFolderId(folderId as string);
    res.json(testCases);
  } catch (error) {
    console.error("Error fetching test cases:", error);
    res.status(500).json({ error: "Could not fetch test cases" });
  }
};

export const createTestCase = async (req: Request, res: Response) => {
  const { folderId } = req.params;
  const { title, testSteps, expectedResults, status } = req.body;
  try {
    const newTestCase = await createNewTestCase(
      folderId as string,
      title,
      testSteps,
      expectedResults,
      status,
    );

    res.status(201).json(newTestCase);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "failed to create test case", details: error.message });
  }
};
