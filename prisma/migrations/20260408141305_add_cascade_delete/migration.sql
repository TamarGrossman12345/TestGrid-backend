-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TestCase" (
    "TestCaseId" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "testSteps" TEXT NOT NULL,
    "expectedResults" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    CONSTRAINT "TestCase_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "TestFile" ("TestFileId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TestCase" ("TestCaseId", "expectedResults", "fileId", "status", "testSteps", "title") SELECT "TestCaseId", "expectedResults", "fileId", "status", "testSteps", "title" FROM "TestCase";
DROP TABLE "TestCase";
ALTER TABLE "new_TestCase" RENAME TO "TestCase";
CREATE TABLE "new_TestFile" (
    "TestFileId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "TestFile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("projectId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TestFile" ("TestFileId", "description", "name", "projectId") SELECT "TestFileId", "description", "name", "projectId" FROM "TestFile";
DROP TABLE "TestFile";
ALTER TABLE "new_TestFile" RENAME TO "TestFile";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
