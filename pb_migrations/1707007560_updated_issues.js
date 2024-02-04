/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("80voqzgon6af299")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e7rajywd",
    "name": "priority",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "highest",
        "high",
        "medium",
        "low",
        "lowest"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("80voqzgon6af299")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e7rajywd",
    "name": "priority",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "highest",
        "high",
        "medium",
        "low",
        "lowest"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
