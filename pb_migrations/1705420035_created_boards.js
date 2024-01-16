/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "1z4hjfg14hxu9gs",
    "created": "2024-01-16 15:47:15.888Z",
    "updated": "2024-01-16 15:47:15.888Z",
    "name": "boards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nwhcudqw",
        "name": "columns",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "mvd5va7e0xrs6vj",
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
  const collection = dao.findCollectionByNameOrId("1z4hjfg14hxu9gs");

  return dao.deleteCollection(collection);
})
