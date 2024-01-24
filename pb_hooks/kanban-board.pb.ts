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

routerAdd("POST", "/api/nira/issue", (c) => {
  const data = new DynamicModel({
    columnId: "",
    title: "",
  });
  c.bind(data);

  const issuesCollection = $app.dao().findCollectionByNameOrId("issues");

  try {
    $app.dao().runInTransaction((txDao) => {
      const issueRecord = new Record(issuesCollection, {
        title: data.title,
        column: data.columnId,
      });
      txDao.saveRecord(issueRecord);

      const columnRecord = txDao.findRecordById("columns", data.columnId);
      columnRecord.set(
        "issues",
        columnRecord.getStringSlice("issues").concat([issueRecord.getId()])
      );
      txDao.saveRecord(columnRecord);
    });
  } catch (error) {
    throw new ApiError(500, `Could not create issue in column: ${data.columnId}`);
  }

  return c.json(200, {
    success: `Successfully created issue in column: ${data.columnId}`,
  });
});

routerAdd("POST", "/api/nira/column", (c) => {
  const data = new DynamicModel({
    boardId: "",
    title: "",
  });
  c.bind(data);

  const columnsCollection = $app.dao().findCollectionByNameOrId("columns");

  try {
    $app.dao().runInTransaction((txDao) => {
      const columnRecord = new Record(columnsCollection, {
        title: data.title,
        board: data.boardId,
      });
      txDao.saveRecord(columnRecord);

      const boardRecord = txDao.findRecordById("boards", data.boardId);
      boardRecord.set(
        "columns",
        boardRecord.getStringSlice("columns").concat([columnRecord.getId()])
      );
      txDao.saveRecord(boardRecord);
    });
  } catch (error) {
    throw new ApiError(500, `Could not create column in board: ${data.boardId}`);
  }

  return c.json(200, {
    success: `Successfully created column in board: ${data.boardId}`,
  });
});
