/*
  Warnings:

  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Project` table. All the data in the column will be lost.
  - The primary key for the `TestCase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TestCase` table. All the data in the column will be lost.
  - The primary key for the `TestFile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TestFile` table. All the data in the column will be lost.
  - The required column `projectId` was added to the `Project` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `TestCaseId` was added to the `TestCase` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `TestFileId` was added to the `TestFile` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "projectId" TEXT NOT NULL PRIMARY KEY,
    "projectName" TEXT NOT NULL,
    "description" TEXT,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Project" ("description", "isPrivate", "projectName") SELECT "description", "isPrivate", "projectName" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_TestCase" (
    "TestCaseId" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "testSteps" TEXT NOT NULL,
    "expectedResults" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    CONSTRAINT "TestCase_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "TestFile" ("TestFileId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TestCase" ("expectedResults", "fileId", "status", "testSteps", "title") SELECT "expectedResults", "fileId", "status", "testSteps", "title" FROM "TestCase";
DROP TABLE "TestCase";
ALTER TABLE "new_TestCase" RENAME TO "TestCase";
CREATE TABLE "new_TestFile" (
    "TestFileId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "TestFile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("projectId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TestFile" ("name", "projectId") SELECT "name", "projectId" FROM "TestFile";
DROP TABLE "TestFile";
ALTER TABLE "new_TestFile" RENAME TO "TestFile";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
