/// <reference path="../pb_data/types.d.ts" />

onRecordBeforeCreateRequest((e) => {
  if (e.httpContext.get("admin")) {
    return null;
  }

  if (!e.record) {
    throw new ApiError(500, "project could not be created");
  }

  const projectRecord = e.record;
  const boardsCollection = $app.dao().findCollectionByNameOrId("boards");
  const columnsCollection = $app.dao().findCollectionByNameOrId("columns");

  try {
    $app.dao().runInTransaction((txDao) => {
      const columnTitles = ["To-Do", "In Progress", "Done"];
      const columnRecordIds = [];

      for (const title of columnTitles) {
        const columnRecord = new Record(columnsCollection, {
          title: title,
        });

        txDao.saveRecord(columnRecord);
        columnRecordIds.push(columnRecord.getId());
      }

      const boardRecord = new Record(boardsCollection, {
        columns: columnRecordIds,
      });
      txDao.saveRecord(boardRecord);

      projectRecord.set("board", boardRecord.getId());
    });
  } catch (error) {
    throw new ApiError(500, "project could not be created");
  }
}, "projects");
