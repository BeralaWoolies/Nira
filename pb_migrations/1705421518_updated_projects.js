/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64bk78qkkx5n4ub")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pwwxpe9n",
    "name": "board",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "1z4hjfg14hxu9gs",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64bk78qkkx5n4ub")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pwwxpe9n",
    "name": "board",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "1z4hjfg14hxu9gs",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
