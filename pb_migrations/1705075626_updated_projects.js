/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64bk78qkkx5n4ub")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "osl3jfgy",
    "name": "members",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": 1,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64bk78qkkx5n4ub")

  // remove
  collection.schema.removeField("osl3jfgy")

  return dao.saveCollection(collection)
})
