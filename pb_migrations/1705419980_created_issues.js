/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "80voqzgon6af299",
    "created": "2024-01-16 15:46:20.175Z",
    "updated": "2024-01-16 15:46:20.175Z",
    "name": "issues",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0cym5brt",
        "name": "title",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ndmex8ak",
        "name": "description",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "@collection.projects.members.id ?= @request.auth.id",
    "viewRule": "@collection.projects.members.id ?= @request.auth.id",
    "createRule": "@collection.projects.members.id ?= @request.auth.id",
    "updateRule": "@collection.projects.members.id ?= @request.auth.id",
    "deleteRule": "@collection.projects.members.id ?= @request.auth.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("80voqzgon6af299");

  return dao.deleteCollection(collection);
})
