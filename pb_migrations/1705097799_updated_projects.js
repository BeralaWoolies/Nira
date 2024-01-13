/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64bk78qkkx5n4ub")

  collection.listRule = "members.id ?= @request.auth.id"
  collection.viewRule = "members.id ?= @request.auth.id"
  collection.createRule = "members.id = @request.auth.id"
  collection.updateRule = "members.id?= @request.auth.id"
  collection.deleteRule = "members.id ?= @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64bk78qkkx5n4ub")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
