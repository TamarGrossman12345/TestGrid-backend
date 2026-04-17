import express from "express";
import prisma from "../db.js";
import { createTestCase, getTestCases, updateTestCase } from "../controllers/testCase.controller.js";

const router = express.Router();

router.get("/get-testCases/:folderId",  getTestCases)
router.patch("/update-testCase/:testCaseId", updateTestCase)
router.post("/create-newTestCase/:folderId", createTestCase);
export default router;
