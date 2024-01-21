/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1z4hjfg14hxu9gs")

  collection.listRule = "project.members.id ?= @request.auth.id"
  collection.viewRule = "project.members.id ?= @request.auth.id"
  collection.createRule = "project.members.id ?= @request.auth.id"
  collection.updateRule = "project.members.id ?= @request.auth.id"
  collection.deleteRule = "project.members.id ?= @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1z4hjfg14hxu9gs")

  collection.listRule = "project.members ?= @request.auth.id"
  collection.viewRule = "project.members ?= @request.auth.id"
  collection.createRule = "project.members ?= @request.auth.id"
  collection.updateRule = "project.members ?= @request.auth.id"
  collection.deleteRule = "project.members ?= @request.auth.id"

  return dao.saveCollection(collection)
})
