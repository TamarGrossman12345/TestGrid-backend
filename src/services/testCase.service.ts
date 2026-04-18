import prisma from "../db.js";

export interface TestCase {
  TestCaseId: string;
  serialId: number;
  title: string;
  testSteps: string;
  expectedResults: string;
}

export const getTestCasesByFolderId = async (folderId: string) => {
  const testCases = await prisma.testCase.findMany({
    where: { fileId: folderId },
  });
  return testCases;
};

export const createNewTestCase = async (
  folderId: string,
  title: string,

  testSteps: string,
  expectedResults: string,
  status: string,
) => {
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
      title: title,
      testSteps: testSteps,
      expectedResults: expectedResults,
      status: status,
      fileId: folderId,
      serialId: nextSerialId,
    },
  });
  return newTestCase;
};

export const updateTestCaseById = async (
  testCasesId: string,
  data: Partial<TestCase>,
) => {
  const updatedTestCase = await prisma.testCase.update({
    where: {
      TestCaseId: testCasesId,
    },
    data: data,
  });

  return updatedTestCase;
};


export const deleteTestCaseById = async (
  testCasesId: string,

) => {
  const deletedTestCase = await prisma.testCase.delete({
    where: {
      TestCaseId: testCasesId,
    }
  });

  return deletedTestCase;
};
