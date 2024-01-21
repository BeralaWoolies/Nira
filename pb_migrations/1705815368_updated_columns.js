/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mvd5va7e0xrs6vj")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mvd5va7e0xrs6vj")

  collection.listRule = "@collection.projects.members.id ?= @request.auth.id"
  collection.viewRule = "@collection.projects.members.id ?= @request.auth.id"
  collection.createRule = "@collection.projects.members.id ?= @request.auth.id"
  collection.updateRule = "@collection.projects.members.id ?= @request.auth.id"
  collection.deleteRule = "@collection.projects.members.id ?= @request.auth.id"

  return dao.saveCollection(collection)
})
