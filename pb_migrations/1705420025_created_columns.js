/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "mvd5va7e0xrs6vj",
    "created": "2024-01-16 15:47:05.008Z",
    "updated": "2024-01-16 15:47:05.008Z",
    "name": "columns",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xyfoe29l",
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
        "id": "da7bowwg",
        "name": "issues",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "80voqzgon6af299",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
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
  const collection = dao.findCollectionByNameOrId("mvd5va7e0xrs6vj");

  return dao.deleteCollection(collection);
})
