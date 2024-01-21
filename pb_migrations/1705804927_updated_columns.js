/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mvd5va7e0xrs6vj")

  // remove
  collection.schema.removeField("bkbrmjmr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lqyl2uqc",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mvd5va7e0xrs6vj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bkbrmjmr",
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

  // remove
  collection.schema.removeField("lqyl2uqc")

  return dao.saveCollection(collection)
})
