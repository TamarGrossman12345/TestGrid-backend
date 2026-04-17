import express from "express";
import prisma from "../db.js";
import { createTestCase, getTestCases } from "../controllers/testCase.controller.js";

const router = express.Router();

router.get("/get-testCases/:folderId",  getTestCases)

router.post("/create-newTestCase/:folderId", createTestCase);
export default router;
