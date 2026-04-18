import type { Request, Response } from "express";
import {
  createNewTestCase,
  deleteTestCaseById,
  getTestCasesByFolderId,
  updateTestCaseById,
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

export const updateTestCase = async (req: Request, res: Response) => {
  const { testCaseId } = req.params;
  const updateData = req.body;
  try {
    const updatedTestCase = await updateTestCaseById(
      testCaseId as string,
      updateData,
    );

    res.status(200).json(updatedTestCase);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "failed to update test case", details: error.message });
  }
};


export const deleteTestCase = async (req: Request, res: Response) => {
  const { testCaseId } = req.params;
  try {
    const deletedTestCase = await deleteTestCaseById(testCaseId as string);

    res.status(200).json(deletedTestCase);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "failed to delete test case", details: error.message });
  }
}
