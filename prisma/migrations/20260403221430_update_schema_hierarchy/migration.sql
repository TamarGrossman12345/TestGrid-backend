/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToTest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_ProjectToTest_B_index";

-- DropIndex
DROP INDEX "_ProjectToTest_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Test";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProjectToTest";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TestFile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "TestFile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TestCase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "testSteps" TEXT NOT NULL,
    "expectedResults" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    CONSTRAINT "TestCase_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "TestFile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectName" TEXT NOT NULL,
    "description" TEXT,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Project" ("description", "id", "projectName") SELECT "description", "id", "projectName" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
