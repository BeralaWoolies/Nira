/// <reference path="../pb_data/types.d.ts" />
// @ts-nocheck

routerAdd("PUT", "/api/nira/update/issues-between", (c) => {
  const data = new DynamicModel({
    sourceColumnId: "",
    sourceColumnIssueIds: [],
    destColumnId: "",
    destColumnIssueIds: [],
    destIndex: 0,
  });
  c.bind(data);

  try {
    $app.dao().runInTransaction((txDao) => {
      const sourceColumnRecord = txDao.findRecordById("columns", data.sourceColumnId);
      const destColumnRecord = txDao.findRecordById("columns", data.destColumnId);

      sourceColumnRecord.set("issues", data.sourceColumnIssueIds);
      destColumnRecord.set("issues", data.destColumnIssueIds);

      const movedIssueId = data.destColumnIssueIds[data.destIndex];
      const movedIssueRecord = txDao.findRecordById("issues", movedIssueId);
      movedIssueRecord.set("column", data.destColumnId);

      txDao.saveRecord(movedIssueRecord);
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

onRecordBeforeCreateRequest((e) => {
  if (!e.record) {
    throw new ApiError(500, "column could not be created");
  }

  const columnRecord = e.record;

  try {
    $app.dao().runInTransaction((txDao) => {
      txDao.saveRecord(columnRecord);

      const boardRecord = txDao.findRecordById("boards", columnRecord.getString("board"));
      boardRecord.set(
        "columns",
        boardRecord.getStringSlice("columns").concat([columnRecord.getId()])
      );
      txDao.saveRecord(boardRecord);
    });
  } catch (error) {
    throw new ApiError(500, `Could not create column in board: ${data.boardId}`);
  }
}, "columns");

onRecordBeforeCreateRequest((e) => {
  if (!e.record) {
    throw new ApiError(500, "issue could not be created");
  }

  const issueRecord = e.record;

  try {
    $app.dao().runInTransaction((txDao) => {
      txDao.saveRecord(issueRecord);

      const columnRecord = txDao.findRecordById("columns", issueRecord.getString("column"));
      columnRecord.set(
        "issues",
        columnRecord.getStringSlice("issues").concat([issueRecord.getId()])
      );
      txDao.saveRecord(columnRecord);
    });
  } catch (error) {
    throw new ApiError(500, `Could not create issue in column: ${data.columnId}`);
  }
}, "issues");
