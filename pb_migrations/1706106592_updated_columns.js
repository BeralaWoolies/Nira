/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mvd5va7e0xrs6vj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3yp8ktwf",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mvd5va7e0xrs6vj")

  // remove
  collection.schema.removeField("3yp8ktwf")

  return dao.saveCollection(collection)
})
