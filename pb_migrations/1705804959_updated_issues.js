/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("80voqzgon6af299")

  // remove
  collection.schema.removeField("zdf4k46t")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("80voqzgon6af299")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zdf4k46t",
    "name": "column",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "mvd5va7e0xrs6vj",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
