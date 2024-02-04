/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("80voqzgon6af299")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qb4dbovs",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "task",
        "bug",
        "story"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("80voqzgon6af299")

  // remove
  collection.schema.removeField("qb4dbovs")

  return dao.saveCollection(collection)
})
