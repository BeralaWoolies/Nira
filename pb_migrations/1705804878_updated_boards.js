/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1z4hjfg14hxu9gs")

  // remove
  collection.schema.removeField("dqi1p900")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1z4hjfg14hxu9gs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dqi1p900",
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
})
