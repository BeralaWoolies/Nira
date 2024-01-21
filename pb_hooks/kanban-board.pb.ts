/// <reference path="../pb_data/types.d.ts" />
// @ts-nocheck

routerAdd("POST", "/api/nira/update/issues-between", (c) => {
  const data = new DynamicModel({
    sourceColumnId: "",
    sourceColumnIssueIds: [],
    destColumnId: "",
    destColumnIssueIds: [],
  });
  c.bind(data);

  try {
    $app.dao().runInTransaction((txDao) => {
      const sourceColumnRecord = txDao.findRecordById("columns", data.sourceColumnId);
      const destColumnRecord = txDao.findRecordById("columns", data.destColumnId);

      sourceColumnRecord.set("issues", data.sourceColumnIssueIds);
      destColumnRecord.set("issues", data.destColumnIssueIds);

      txDao.saveRecord(sourceColumnRecord);
      txDao.saveRecord(destColumnRecord);
    });
  } catch (error) {
    throw new ApiError(
      500,
      `Could not reorder issues between source column: ${data.sourceColumnId} and destination column: ${data.destColumnId}`
    );
  }

  return c.json(200, {
    success: `Successfully reordered issues between source column: ${data.sourceColumnId} and destination column: ${data.destColumnId}`,
  });
});
