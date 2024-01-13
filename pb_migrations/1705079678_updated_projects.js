/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64bk78qkkx5n4ub")

  collection.listRule = "@request.auth.id ?= members.id"
  collection.viewRule = "@request.auth.id ?= members.id"
  collection.createRule = "@request.auth.id ?= members.id"
  collection.updateRule = "@request.auth.id ?= members.id"
  collection.deleteRule = "@request.auth.id ?= members.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64bk78qkkx5n4ub")

  collection.listRule = "@request.auth.id = members.id"
  collection.viewRule = "@request.auth.id = members.id"
  collection.createRule = "@request.auth.id = members.id"
  collection.updateRule = "@request.auth.id = members.id"
  collection.deleteRule = "@request.auth.id = members.id"

  return dao.saveCollection(collection)
})
