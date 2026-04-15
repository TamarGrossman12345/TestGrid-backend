import express from "express";
import prisma from "../db.js";
const router = express.Router();



router.post("/create-folder", async (req, res) => {
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

router.delete("/delete-folder/:id/", async (req, res) => {
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
export default router;